const Episode = require('./episode')

module.exports = class OldEpisode extends Episode {
  async parse () {
    const { axios } = this
    const response = await axios.get(this.url)
    // Get config
    const data = response.data
    await this.parseConfig(data)
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

  async parseConfig (data) {
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
    await this.processMetadata()
  }
}
