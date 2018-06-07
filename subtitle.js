import subsrt from 'subsrt'

class Subtitle {
  constructor (label, language, content) {
    this.label = label
    this.language = language
    this.captions = subsrt.parse(content)
  }

  static detect (content) {
    return subsrt.detect(content)
  }

  asWebVTT () {
    return subsrt.convert(this.captions, {
      format: 'vtt'
    })
  }
}

export default Subtitle
