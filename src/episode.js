import axios from 'axios'

import Subtitle from './subtitle'

class Episode {
  constructor (url) {
    this.url = url
  }

  async parse () {
    const response = await axios.get(this.url)
    // Get config
    const data = response.data
    await this.parseConfigUrl(data)
    await this.getSubtitles()
  }

  async parseConfigUrl (data) {
    let regex = /vilos\.config\.media\s*=\s*(\{.*\})/m
    let match = regex.exec(data)
    if (!match) {
      throw new Error(`Failed to find config`)
    }
    const config = JSON.parse(match[1])

    // We need to get seriesTitle separately
    regex = /<meta property="og:title" content="(.*)">/m
    match = regex.exec(data)
    if (match) {
      this.seriesTitle = match[1]
    }

    this.config = config
    const { metadata } = config
    this.episodeTitle = metadata.title
    this.episodeNumber = Number(metadata.episode_number)
    this.poster = config.thumbnail.url
  }

  async getSubtitles () {
    const { config: { subtitles: subtitleMetadata } } = this
    this.subtitles = []
    await Promise.all(subtitleMetadata.map(async ({ language, url, title, format }) => {
      const response = await axios.get(url)
      if (response.status !== 200) {
        throw new Error(response.statusText)
      }
      const { data: ass } = response
      this.subtitles.push(new Subtitle(language.substr(0, 2), title, ass))
    }))
  }
}

export default Episode
