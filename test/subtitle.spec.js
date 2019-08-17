import Episode from '@/episode'
import Subtitle from '@/subtitle'
import WebVTTParser from './vtt-parser'

async function setup (url = 'https://www.crunchyroll.com/kinos-journey-the-beautiful-world-the-animated-series/episode-12-fields-of-sheep-749579') {
  const episode = new Episode(url)
  await episode.parse()

  const subtitle = episode.subtitles.find(entry => entry.language === 'en')
  const ass = subtitle.build('ass')
  // console.log(JSON.stringify(subtitle))
  return { episode, ass }
}

describe('Test subtitles', () => {
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

  test('Perfectly valid VTT format', async () => {
    const { ass } = await setup()
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    const validator = new WebVTTParser()

    expect(vtt.split('\n')[3].trim()).toEqual('00:00:08.940 --> 00:00:13.530')
    const r = validator.parse(vtt, 'chapters')
    expect(r.errors.length).toBe(0)
  })

  test('Perfectly valid VTT despite caption containing newline at the start of string', async () => {
    // This episode is known to have a few captions with leading newline character
    const { ass } = await setup('https://www.crunchyroll.com/en-gb/jojos-bizarre-adventure/episode-8-bloody-battle-jojo-dio-652095')
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    const validator = new WebVTTParser()
    const r = validator.parse(vtt, 'chapters')
    expect(r.errors.length).toBe(0)
  })
})
