const mustache = require('mustache')
const Episode = require('./episode')

const tokenURL = 'https://www.crunchyroll.com/auth/v1/token'
const signatureURL = 'https://www.crunchyroll.com/index/v2'
const queryParams = '?Signature={{signature}}&Policy={{policy}}&Key-Pair-Id={{keyPairID}}'
const metadataURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/objects/{{videoID}}${queryParams}`
const streamsURLTemplate = `https://www.crunchyroll.com/cms/v2{{{cmsBucket}}}/videos/{{videoID}}/streams${queryParams}`

const videoIDRegex = /https?:\/\/(.*\.)?crunchyroll\.com\/(\S+\/)?watch\/([a-zA-Z0-9_]+)(\/.*)?/

const defaultCMSType = 'cms'

module.exports = class NewEpisode extends Episode {
  /**
   *
   * @param {import('./types').AuthInfo} authInfo
   * @param {string[]} templates
   * @returns
   */
  async fetchMetadataURL ({ videoID, keyPairID, policy, signature, cmsBucket }, templates = [metadataURLTemplate]) {
    const { axios } = this
    for (const urlTemplate of templates) {
      try {
        const metadataURL = mustache.render(urlTemplate, {
          cmsBucket,
          videoID,
          keyPairID,
          policy,
          signature
        })
        const response = await axios.get(metadataURL)
        return response
      } catch (e) {
      }
    }
    throw new Error('Failed to fetch data from all metadata URLs')
  }

  /**
   *
   * @param {string} href
   * @param {import('./types').AuthInfo} authInfo
   * @param {string[]} templates
   * @returns
   */
  async fetchStreamsURL (href, { videoID, keyPairID, policy, signature, cmsBucket }, templates = [streamsURLTemplate]) {
    const { axios } = this
    for (const streamsURLTemplate of templates) {
      try {
        const streamsURL = mustache.render(streamsURLTemplate, {
          cmsBucket,
          videoID,
          keyPairID,
          policy,
          signature
        })
        const response = await axios.get(streamsURL)
        return response
      } catch (e) {
      }
    }
    throw new Error('Failed to fetch data from all streams URLs')
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getAccessToken () {
    const { axios, basicAuth } = this
    // We need to try two grant types
    const grantTypes = ['etp_rt_cookie', 'client_id']
    for (const grantType of grantTypes) {
      const params = new URLSearchParams()
      params.set('grant_type', grantType)
      try {
        const response = await axios.post(tokenURL, params, {
          headers: {
            Authorization: `Basic ${basicAuth}`,
            'content-type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true
        })
        const { data: { access_token: accessToken } } = response
        return accessToken
      } catch (e) {
      }
    }
    throw new Error('Failed to get access token')
  }

  async parse () {
    const { axios } = this
    let response
    if (!this.basicAuth) {
      response = await axios.get(this.url)
      // Get config
      const data = response.data
      const { basicAuth } = await this.getConfigForParse(data)
      this.basicAuth = basicAuth
    }
    const accessToken = await this.getAccessToken()
    response = await axios.get(signatureURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const cmsType = this.cmsType || defaultCMSType
    const { data: { [cmsType]: { bucket: cmsBucket, key_pair_id: keyPairID, policy, signature } } } = response
    this.keyPairID = keyPairID
    this.policy = policy
    this.signature = signature

    // Get config
    const match = videoIDRegex.exec(this.url)
    if (!match) {
      const err = new Error('Failed to match videoID regex to url')
      err.data = { url: this.url, cmsBucket }
      throw err
    }
    const videoID = match[3]
    response = await this.fetchMetadataURL({ videoID, keyPairID, policy, signature, cmsBucket }, [metadataURLTemplate])
    const { data: { items: [objectMetadata] } } = response
    const { episode_metadata: metadata } = objectMetadata
    this.objectMetadata = objectMetadata
    this.metadata = metadata
    // Convert this to be in the same format as the older config so we get some parsing for free
    metadata.title = this.objectMetadata.title
    this.seriesTitle = metadata.series_title
    this.seasonIndex = metadata.season_number

    this.config = { metadata }
    // Poster
    try {
      const { images: { thumbnail: [thumbnails] } } = objectMetadata
      this.config.thumbnail = { url: thumbnails[thumbnails.length - 1].source }
    } catch (e) {
      this.config.thumbnail = { url: '' }
    }
    let streamsHref
    const streamsTemplates = [streamsURLTemplate]
    try {
      ;({ __links__: { streams: { href: streamsHref } } } = objectMetadata)
      if (streamsHref) {
        const altTemplate = `${new URL(streamsURLTemplate).origin}${streamsHref}${queryParams}`
        streamsTemplates.unshift(altTemplate)
      }
    } catch (e) {
    }
    response = await this.fetchStreamsURL(streamsHref, { videoID, keyPairID, policy, signature, cmsBucket }, streamsTemplates)
    const { data: { streams: streamsRaw, subtitles: subtitlesRaw } } = response
    // We're going to have to convert this streams object to the old format
    const streams = []
    for (const [type, data] of Object.entries(streamsRaw)) {
      for (const [locale, entry] of Object.entries(data)) {
        const stream = {}
        stream.format = type
        stream.audio_lang = locale || 'default'
        stream.hardsub_lang = entry.hardsub_locale
        stream.url = entry.url
        streams.push(stream)
      }
    }

    const subtitles = []
    for (const data of Object.values(subtitlesRaw)) {
      const { locale, format, url } = data
      let language
      let country
      let title
      let srclang
      try {
        ({ language, country, srclang } = this.getLanguageAndCountry(locale))
        title = `${language}`
        if (country) {
          title += ` (${country})`
        }
      } catch (e) {
        language = locale ? locale.substring(0, 2) : '--'
        country = ''
        title = 'Unknown'
        srclang = '--'
      }
      const subtitle = {
        url,
        title,
        language,
        country,
        format,
        srclang,
        kind: 'captions'
      }
      subtitles.push(subtitle)
    }

    Object.assign(this.config, {
      streams,
      subtitles
    })
    await this.processMetadata()
  }

  async isPremiumVideo () {
    if (!this.metadata) {
      await this.parse()
    }
    const { metadata: { is_premium_only: isPremiumVideo } } = this
    return !!isPremiumVideo
  }

  // This function returns the basicAuth
  /**
   *
   * @param {string} data
   * @returns {Promise<any>}
   */
  async getConfigForParse (data) {
    // This data contains the accountAuthClientId parameter that we need
    const regex = /"accountAuthClientId":\s*"(.*?)"/g
    const match = regex.exec(data)
    if (!match) {
      throw new Error('Did not find expected pattern')
    }
    const id = match[1]
    const basicAuth = btoa(`${id}:`) // This is the format they use..for some reason
    return { basicAuth }
  }
}
