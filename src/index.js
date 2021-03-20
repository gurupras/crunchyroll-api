const Axios = require('axios')
const Episode = require('./episode')
const BetaEpisode = require('./beta')
const OldEpisode = require('./old')
const Subtitle = require('./subtitle')

async function getEpisode (url, config, axios = Axios) {
  /** @type {Episode} */
  let episode
  if (url.includes('beta.crunchyroll')) {
    episode = new BetaEpisode(url, config, axios)
  } else {
    episode = new OldEpisode(url, config, axios)
  }
  await episode.parse()
  return episode
}

module.exports = {
  BetaEpisode,
  OldEpisode,
  Episode,
  Subtitle,
  getEpisode
}
