import subsrt from 'subsrt'

const oldVTT = subsrt.format['vtt']
subsrt.format['vtt'] = {
  name: 'vtt',
  parse: oldVTT.parse,
  build (captions, options) {
    const fixedCaptions = [...captions]
    fixedCaptions.forEach(entry => { entry.data.Text = entry.data.Text.trim() })
    let content = oldVTT.build(fixedCaptions, options)
    content = content.replace(/(.*) --> (.*)/g, (match, p1, p2) => {
      return `${p1.replace(/,/, '.')} --> ${p2.replace(/,/, '.')}`
    })
    return content
  },
  detect: oldVTT.detect
}

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

  build (format) {
    return subsrt.build(this.captions, { format })
  }
}

export default Subtitle
