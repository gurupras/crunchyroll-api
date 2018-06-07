import { Episode, Subtitle } from '../index'

describe('Test import', async () => {
  test('Episode', async () => {
    const episode = new Episode('http://www.crunchyroll.com/my-hero-academia/episode-1-izuku-midoriya-origin-730707')
    expect(episode).toBeTruthy()
  })

  test('Subtitle', async () => {
    var content = ''
    content += '5' + '\r\n'
    content += '00:00:16,700 --> 00:00:21,480' + '\r\n'
    content += 'Okay, so we have all the ingredients laid out here' + '\r\n'
    const type = Subtitle.detect(content)
    expect(type).toEqual('srt')
  })
})
