import Episode from '@/episode'
import Subtitle from '@/subtitle'

async function setup () {
  const episode = new Episode('https://www.crunchyroll.com/kinos-journey-the-beautiful-world-the-animated-series/episode-12-fields-of-sheep-749579')
  await episode.parse()

  const subtitle = episode.subtitles[0]
  const ass = subtitle.build('ass')
  // console.log(JSON.stringify(subtitle))
  return { episode, ass }
}

describe('Test subtitles', async () => {
  test('Parse', async () => {
    const { ass } = await setup()
    const type = Subtitle.detect(ass)
    expect(type).toEqual('ass')
  })

  test('Build', async () => {
    const { ass } = await setup()
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    expect(vtt).toBeTruthy()
  })
})
