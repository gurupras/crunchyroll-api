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

  test.skip('Subtitle conversion', async () => {
    await episode.parse()
    const subtitle = episode.subtitles[0]
    expect(() => subtitle.build('vtt')).not.toThrow()
  })

  test('getStreamsByLanuage', async () => {
    await episode.parse()
    episode.config.streams = [
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'itIT',
        url: 'url-jaJP-itIT',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'ruRU',
        url: 'url-jaJP-ruRU',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'enUS',
        url: 'url-jaJP-enUS',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: null,
        url: 'url-jaJP-',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'ptBR',
        url: 'url-jaJP-ptBR',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'deDE',
        url: 'url-jaJP-deDE',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'frFR',
        url: 'url-jaJP-frFR',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'arME',
        url: 'url-jaJP-arME',
        resolution: 'adaptive'
      },
      {
        format: 'adaptive_hls',
        audio_lang: 'jaJP',
        hardsub_lang: 'esES',
        url: 'url-jaJP-esES',
        resolution: 'adaptive'
      }
    ]

    const streams = episode.getStreamsByLanuage('jaJP', 'enUS')
    expect(streams).toBeArrayOfSize(1)
    const stream = streams[0]
    expect(stream.audio_lang).toEqual('jaJP')
    expect(stream.hardsub_lang).toEqual('enUS')
  })
})
