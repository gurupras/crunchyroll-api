const Axios = require('axios')

const Subtitle = require('./subtitle')

module.exports = class Episode {
  /**
   *
   * @param {string} url
   * @param {any} parameters
   * @param {import('axios').AxiosInstance} axios
   */
  constructor (url, parameters, axios = Axios.create()) {
    this.url = url
    Object.assign(this, parameters)
    this.axios = axios
  }

  async parse () {
    throw new Error('Unimplemented')
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
      US: 'America',
      IN: 'India'
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
      kr: '한국어',
      hi: 'हिंदी'
    }

    // If input has a -, get rid of it
    input = input.replace(/-/g, '')
    const lang = input.substring(0, 2).toLowerCase()
    const ctry = input.substring(2, 4).toUpperCase()

    const language = languageMap[lang] || '??'
    const country = countryMap[ctry] || ''
    return { language, country, srclang: lang }
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

  async processMetadata () {
    const { config } = this
    const { metadata, streams } = config
    this.episodeTitle = metadata.title
    this.episodeNumber = Number(metadata.episode_number)
    this.poster = config.thumbnail.url
    streams.forEach(stream => {
      try {
        if (stream.audio_lang) {
          const { language, country, srclang } = this.getLanguageAndCountry(stream.audio_lang)
          Object.assign(stream, {
            audio: {
              srclang,
              language,
              country
            }
          })
        }
      } catch (e) {
      }
      try {
        const { language, country, srclang } = this.getLanguageAndCountry(stream.hardsub_lang)
        Object.assign(stream, {
          hardsub: {
            srclang,
            language,
            country
          }
        })
      } catch (e) {
      }
    }, this)
  }
}
