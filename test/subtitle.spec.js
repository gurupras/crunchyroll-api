import Episode from '../episode'
import Subtitle from '../subtitle'

async function setup () {
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
  return { episode, ass }
}

describe('Test subtitles', async () => {
  test('Parse', async () => {
    const { episode, ass } = await setup()
    const type = Subtitle.detect(ass)
    expect(type).toEqual('ass')
  })

  test('Build', async () => {
    const { episode, ass } = await setup()
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    expect(vtt).toBeTruthy()
  })
})
