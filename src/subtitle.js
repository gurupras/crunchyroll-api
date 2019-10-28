import subsrt from 'subsrt'

const oldVTT = subsrt.format.vtt
subsrt.format.vtt = {
  name: 'vtt',
  parse: oldVTT.parse,
  build (captions, options) {
    function replace (entry, fn) {
      entry.data.Text = fn(entry.data.Text)
      entry.text = fn(entry.text)
    }
    // Make a copy and remove meta since there's an issue with subsrt not
    // displaying it properly.
    const fixedCaptions = [...captions].filter(x => x.type !== 'meta')
    // Also, trim the text while we're at it to ensure there's no newline
    // at the start and replace & and < since these characters are not allowed
    // as part of WebVTT spec
    fixedCaptions.forEach(entry => {
      if (entry.type !== 'caption') {
        return
      }
      replace(entry, s => s.trim().replace('\\N', '').replace('\\R', '').replace('&', '&amp;').replace('<', '&lt;'))
    })

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
