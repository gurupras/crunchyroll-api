import axios from 'axios'
import Episode from '@/episode'
import Subtitle from '@/subtitle'
import WebVTTParser from './vtt-parser'

async function setup (url = 'https://www.crunchyroll.com/kinos-journey-the-beautiful-world-the-animated-series/episode-12-fields-of-sheep-749579') {
  const episode = new Episode(url)
  await episode.parse()

  // Manually set up the subtitles
  episode.config.subtitles = [
    {
      url: 'https://dl.v.vrv.co/evs/e9cebffbc71a1b28f8ba74ab9f715e4a/assets/0wtyfaxwwe98l40_39925.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kbC52LnZydi5jby9ldnMvZTljZWJmZmJjNzFhMWIyOGY4YmE3NGFiOWY3MTVlNGEvYXNzZXRzLzB3dHlmYXh3d2U5OGw0MF8qLnR4dCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTU4MDUxMzg1Mn19fV19&Signature=k4aJLVvN-mrhOCk3MH7jd9WTrRX93o3Nq9paPDjnFYzO7vR7WvX08gLskx6xX1DWMqNdKlgghVM2bhs2IEGvLtns4rd3p1b45IN6iCmaI0G4tvBdFv35MXJ~NcN~oqD5Kiotmy4HI~btZatVYP8Dmpqknbd1zItoTfWz3IzUEIC8fvn0l~JSooOYstVz1qDGhQA2gYYJyhccq685L~Tz3KncWtBTDm7hXbmhZffIp7VPoijS1iwk80ZVdYTBY7OrRyHyINUuZGvJd7nuB6IZq8nX0gjHO30N46QZdaK9q4PqzQ6GWqXN0q3M4wcOw8DgwJrfMtxHyKcsu2dYMgvmew__&Key-Pair-Id=DLVR',
      kind: 'captions',
      language: 'en',
      title: 'English (US)',
      format: 'ass'
    },
    {
      url: 'https://dl.v.vrv.co/evs/e9cebffbc71a1b28f8ba74ab9f715e4a/assets/0wtyfaxwwe98l40_165787.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kbC52LnZydi5jby9ldnMvZTljZWJmZmJjNzFhMWIyOGY4YmE3NGFiOWY3MTVlNGEvYXNzZXRzLzB3dHlmYXh3d2U5OGw0MF8qLnR4dCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTU4MDUxMzg1Mn19fV19&Signature=k4aJLVvN-mrhOCk3MH7jd9WTrRX93o3Nq9paPDjnFYzO7vR7WvX08gLskx6xX1DWMqNdKlgghVM2bhs2IEGvLtns4rd3p1b45IN6iCmaI0G4tvBdFv35MXJ~NcN~oqD5Kiotmy4HI~btZatVYP8Dmpqknbd1zItoTfWz3IzUEIC8fvn0l~JSooOYstVz1qDGhQA2gYYJyhccq685L~Tz3KncWtBTDm7hXbmhZffIp7VPoijS1iwk80ZVdYTBY7OrRyHyINUuZGvJd7nuB6IZq8nX0gjHO30N46QZdaK9q4PqzQ6GWqXN0q3M4wcOw8DgwJrfMtxHyKcsu2dYMgvmew__&Key-Pair-Id=DLVR',
      kind: 'captions',
      language: 'es',
      title: 'Spanish',
      format: 'ass'
    },
    {
      url: 'https://dl.v.vrv.co/evs/e9cebffbc71a1b28f8ba74ab9f715e4a/assets/0wtyfaxwwe98l40_168639.txt?Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cCo6Ly9kbC52LnZydi5jby9ldnMvZTljZWJmZmJjNzFhMWIyOGY4YmE3NGFiOWY3MTVlNGEvYXNzZXRzLzB3dHlmYXh3d2U5OGw0MF8qLnR4dCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTU4MDUxMzg1Mn19fV19&Signature=k4aJLVvN-mrhOCk3MH7jd9WTrRX93o3Nq9paPDjnFYzO7vR7WvX08gLskx6xX1DWMqNdKlgghVM2bhs2IEGvLtns4rd3p1b45IN6iCmaI0G4tvBdFv35MXJ~NcN~oqD5Kiotmy4HI~btZatVYP8Dmpqknbd1zItoTfWz3IzUEIC8fvn0l~JSooOYstVz1qDGhQA2gYYJyhccq685L~Tz3KncWtBTDm7hXbmhZffIp7VPoijS1iwk80ZVdYTBY7OrRyHyINUuZGvJd7nuB6IZq8nX0gjHO30N46QZdaK9q4PqzQ6GWqXN0q3M4wcOw8DgwJrfMtxHyKcsu2dYMgvmew__&Key-Pair-Id=DLVR',
      kind: 'captions',
      language: 'pt',
      title: 'Portugese',
      format: 'ass'
    }
  ]
  await episode.getSubtitles()

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

  test.skip('Perfectly valid VTT format', async () => {
    // TODO: Fix this test
    const { ass } = await setup()
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    const validator = new WebVTTParser()

    expect(vtt.split('\n')[3].trim()).toEqual('00:00:05.180 --> 00:00:07.260')
    const r = validator.parse(vtt, 'chapters')
    expect(r.errors.length).toBe(2)
  })

  test('Perfectly valid VTT despite caption containing newline at the start of string', async () => {
    // This episode is known to have a few captions with leading newline character
    const { ass } = await setup('https://www.crunchyroll.com/en-gb/jojos-bizarre-adventure/episode-8-bloody-battle-jojo-dio-652095')
    const sub = new Subtitle('dummy', 'du', ass)
    const vtt = sub.build('vtt')
    const validator = new WebVTTParser()
    const r = validator.parse(vtt, 'chapters')
    expect(r.errors.length).toBe(2)
  })
})
