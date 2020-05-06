import Axios from 'axios'

import Subtitle from './subtitle'

class Episode {
  constructor (url, axios = Axios) {
    this.url = url
    this.axios = axios
  }

  async parse () {
    const { axios } = this
    const response = await axios.get(this.url)
    // Get config
    const data = response.data
    await this.parseConfigUrl(data)
    await this.getSubtitles()
  }

  async isPremiumVideo () {
    const { axios } = this
    const response = await axios.get(this.url)
    const { data } = response
    const pattern = /<script type="application\/ld\+json">\s*(\{.*?\})\s*<\/script>/mg
    const match = pattern.exec(data)
    if (match) {
      const metadataStr = match[1]
      const metadata = JSON.parse(metadataStr)
      const { potentialAction = {} } = metadata
      const { actionAccessibilityRequirement = {} } = potentialAction
      const { category = 'nologinrequired', requiresSubscription = [] } = actionAccessibilityRequirement
      return category !== 'nologinrequired' && requiresSubscription.length > 0
    }
    return false
  }

  async parseConfigUrl (data) {
    let regex = /vilos\.config\.media\s*=\s*(\{.*\})/m
    let match = regex.exec(data)
    if (!match) {
      throw new Error('Failed to find config')
    }
    const config = JSON.parse(match[1])

    // We need to get seriesTitle separately
    regex = /vilos\.config\.analytics\s*=\s*(\{.*\})/m
    match = regex.exec(data)
    if (match) {
      try {
        const analytics = JSON.parse(match[1])
        this.seriesTitle = analytics.media_reporting_parent.title
      } catch (e) {
      }
    }

    this.config = config
    const { metadata, streams } = config
    this.episodeTitle = metadata.title
    this.episodeNumber = Number(metadata.episode_number)
    this.poster = config.thumbnail.url
    streams.forEach(stream => {
      try {
        if (stream.audio_lang) {
          const { language, country } = this.getLanguageAndCountry(stream.audio_lang)
          Object.assign(stream, {
            audio: {
              language,
              country
            }
          })
        }
      } catch (e) {
      }
      try {
        const { language, country } = this.getLanguageAndCountry(stream.hardsub_lang)
        Object.assign(stream, {
          hardsub: {
            language,
            country
          }
        })
      } catch (e) {
      }
    }, this)
  }

  getLanguageAndCountry (input) {
    const countryMap = {
      BR: 'Brasil',
      DE: 'Germany',
      ES: 'España',
      FR: 'France',
      IT: 'Italy',
      JP: 'Japan',
      LA: 'América Latina',
      UK: 'United Kingdom',
      US: 'America'
    }
    const languageMap = {
      en: 'English',
      de: 'Deutsch',
      es: 'Español',
      it: 'Italiano',
      ja: '日本語',
      fr: 'Français',
      pt: 'Português',
      ar: 'العربية',
      ru: 'Русский',
      kr: '한국어'
    }

    const lang = input.substring(0, 2).toLowerCase()
    const ctry = input.substring(2, 4).toUpperCase()

    const language = languageMap[lang]
    const country = countryMap[ctry]
    return { language, country }
  }

  getStreamsByLanuage (audioLang, hardsubLang) {
    const { config: { streams } } = this
    return streams.filter(stream => stream.audio_lang === audioLang && stream.hardsub_lang === hardsubLang)
  }

  async getSubtitles () {
    const { axios } = this
    const { config: { subtitles: subtitleMetadata } } = this
    this.subtitles = []
    await Promise.all(subtitleMetadata.map(async ({ language, url, title, format }) => {
      const response = await axios.get(url)
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      const { data: ass } = response
      this.subtitles.push(new Subtitle(title, language.substr(0, 2), ass))
    }))
  }
}

export default Episode
