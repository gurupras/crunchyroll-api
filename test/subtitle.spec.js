import Episode from '../episode'
import Subtitle from '../subtitle'

describe('Test subtitles', async () => {
  test('Subtitle parsing', async () => {
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
    const ass = await Episode.convertToASS(data)
    const type = Subtitle.detect(ass)
    expect(type).toEqual('ass')
  })
})
