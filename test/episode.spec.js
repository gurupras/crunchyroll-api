import axios from 'axios'
import Episode from '@/episode'
import jsdom from 'jsdom'

let episode
beforeEach(() => {
  episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
})
describe('Episode', () => {
  test('Get config & subtitles', async () => {
    await episode.parse()
    expect(episode.config).toBeTruthy()
    expect(episode.config.subtitles).toBeTruthy()
    expect(episode.seriesTitle).toEqual('My Hero Academia')
    expect(episode.episodeTitle).toEqual('Izuku Midoriya: Origin')
    expect(episode.episodeNumber).toEqual(1)
  })

  test('isPremiumVideo', async () => {
    // TODO: Will have to change this URL on every  test
    await expect(episode.isPremiumVideo()).resolves.toBe(false)
    // Now load a premium video
    // We get a known-premium-video by scraping crunchyroll's home page for a premium video
    const response = await axios.get('https://www.crunchyroll.com')
    const { data: page } = response
    const dom = new jsdom.JSDOM(page)
    const premiumAnchorImage = dom.window.document.body.querySelector('img[src="https://www.crunchyroll.com/i/premium_crown_tiny.png"]')
    expect(premiumAnchorImage).toBeTruthy()
    const premiumAnchor = premiumAnchorImage.parentNode
    expect(premiumAnchor).toBeTruthy()
    const url = `https://www.crunchyroll.com/${premiumAnchor.href}`
    episode = new Episode(url)
    await expect(episode.isPremiumVideo()).resolves.toBe(true)
  }, 300000)

  test('Subtitle conversion', async () => {
    await episode.parse()
    const subtitle = episode.subtitles[0]
    expect(() => subtitle.build('vtt')).not.toThrow()
  })
})
