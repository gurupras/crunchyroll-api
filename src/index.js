const Axios = require('axios')
const Episode = require('./episode')
const BetaEpisode = require('./beta')
const Subtitle = require('./subtitle')

async function getEpisode (url, config, axios = Axios) {
  /** @type {Episode} */
  const episode = new BetaEpisode(url, config, axios)
  await episode.parse()
  return episode
}

module.exports = {
  BetaEpisode,
  Episode,
  Subtitle,
  getEpisode
}
