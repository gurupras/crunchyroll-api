import subsrt from 'subsrt'

class Subtitle {
  constructor (label, language, content) {
    this.label = label
    this.language = language
    if (typeof content === 'string') {
      this.captions = subsrt.parse(content)
    } else {
      this.captions = content
    }
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
