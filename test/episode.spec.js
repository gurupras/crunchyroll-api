import Episode from '../episode'

describe('Decrypt Subtitles', async () => {
  test('Get video data', async () => {
    const episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
    await episode.parse()

    expect(episode.seriesTitle.length)
    expect(episode.episodeTitle.length)
    expect(episode.episodeNumber.length)
    expect(episode.subtitles.length).toBeGreaterThan(0)
    episode.subtitles.forEach((subtitle) => {
      expect(subtitle.apiUrl).toBeTruthy()
      expect(subtitle.iv.length)
      expect(subtitle.data).toBeTruthy()
    })
  })

  test('generate key', async () => {
    const episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
    await episode.parse()

    const subtitleID = episode.subtitles[0].subtitleId
    const keyData = await episode.generateKey(subtitleID)
    expect(keyData.eq1).toBe(88295119)
    expect(keyData.eq2).toBe(88140282)
    expect(keyData.eq3).toBe(2911107062)
    expect(keyData.hashString).toBe(`$&).6CXzPHw=2N_+isZK2911107062`)
    expect(Array.from(keyData.hashData)).toEqual([36, 38, 41, 46, 54, 67, 88, 122, 80, 72, 119, 61, 50, 78, 95, 43, 105, 115, 90, 75, 50, 57, 49, 49, 49, 48, 55, 48, 54, 50])
    expect(Array.from(keyData.key)).toEqual([206, 206, 170, 38, 131, 32, 36, 24, 250, 152, 34, 214, 74, 70, 233, 234, 178, 172, 246, 19, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  })

  test('decrypt & decompress', async () => {
    const episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
    await episode.parse()

    const subtitle = episode.subtitles[0]
    // console.log(JSON.stringify(subtitle))
    const subtitleID = subtitle.subtitleId
    // console.log(`iv=${subtitle.iv}`)
    const decryptedSubtitle = await episode.decryptSubtitles(subtitleID, subtitle.iv, subtitle.data)
    // console.log(decryptedSubtitle)
    const decompressedSubtitle = await episode.decompress(decryptedSubtitle)
    const data = decompressedSubtitle.toString('utf-8')
    expect(data.indexOf('<event id=')).toBeGreaterThan(-1)
  })

  test('test content', async () => {
    const episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
    await episode.parse()

    const subtitles = await episode.getSubtitles()
    subtitles.forEach((entry) => {
      expect(entry.label).toBeTruthy()
      expect(entry.language).toBeTruthy()
      expect(entry.captions).toBeTruthy()
    })
  })
})
