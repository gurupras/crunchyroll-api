import Episode from '@/episode'

let episode
beforeAll(() => {
  episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
})
describe('Episode', () => {
  test('Get config & subtitles', async () => {
    await episode.parse()
    expect(episode.config).toBeTruthy()
    expect(episode.config.subtitles).toBeTruthy()
    // expect(episode.seriesTitle).toEqual('My Hero Academia')
    expect(episode.episodeTitle).toEqual('Izuku Midoriya: Origin')
    expect(episode.episodeNumber).toEqual(1)
  })

  test('Subtitle conversion', async () => {
    await episode.parse()
    const subtitle = episode.subtitles[0]
    expect(() => subtitle.build('vtt')).not.toThrow()
  })
})
