import { TextEncoder, TextDecoder} from 'text-encoding'
import axios from 'axios'
import crypto from 'crypto'
import qs from 'qs'
import zlib from 'zlib'
import URI from 'urijs'
import xml2js from 'xml2js'

import Subtitle from './subtitle'

function createString (args) {
  var i = 0
  var argArray = [args[2], args[3]]
  for (; i < args[0]; i++) {
    argArray.push(argArray[argArray.length - 1] + argArray[argArray.length - 2])
  }
  var finalString = ''
  const textDecoder = new TextDecoder('ascii')
  argArray.splice(2).forEach((arg) => {
    finalString += String.fromCharCode(arg % args[1] + 33)
  })
  return finalString
}

function xmlToJson (data) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(data, {
      explicitArray: false,
      explicitRoot: false
    }, (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}


class Episode {
  constructor (url) {
    this.url = url
    if (url) {
      this.episodeID = Number(url.substr(url.length-6))
    }
  }

  async apiRequest (params, data) {
    return axios({
      method: 'POST',
      url: `http://www.crunchyroll.com/xml/`,
      params: params,
      data: data,

      // data: qs.stringify(params),
      headers: {
      //   host: 'www.crunchyroll.com',
      //   origin: 'http://www.crunchyroll.com',
        // 'content-type': 'application/x-www-form-urlencoded',
      //   referer: 'http://www.crunchyroll.com/vendor/StandardVideoPlayer-10dff2a.swf',
      //   Accept: '*/*',
      //   'Accept-Encoding': 'gzip, deflate',
      //   'Accept-Language': 'en-US,en;q=0.9',
      //   'Save-Data': 'on',
      //   'X-Requested-With': 'ShockwaveFlash/29.0.0.171',
      //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36'
      },
    })
  }

  async parse () {
    const response = await axios.get(this.url)
    // Get config
    const data = response.data
    await this.parseConfigUrl(data)
    await this.getSubtitleInfo()
  }

  async parseConfigUrl (data) {
    const regex = /"config_url":"(.*?)"/gm
    const match = regex.exec(data)
    if (!match) {
      throw new Error(`Failed to find config_url`)
    }
    this.configUrl = decodeURIComponent(match[1])
    const config = new URI(this.configUrl).query(true)

    var data = encodeURIComponent(this.url)
    data = data.replace(/\./g, '%2E').replace(/-/g, '%2D')
    data = `current_page=${data}`
    data = data.replace(/_/g, '%5F')

    const response = await this.apiRequest({
      req: 'RpcApiVideoPlayer_GetStandardConfig',
      media_id: this.episodeID,
    }, data)
    const json = await xmlToJson(response.data)
    const metadata = json['default:preload'].media_metadata
    this.seriesTitle = metadata.series_title
    this.episodeTitle = metadata.episode_title
    this.episodeNumber = metadata.episode_number
    this.poster = metadata.episode_image_url
  }

  async getSubtitles () {
    const self = this

    async function processSubtitle (subtitle) {
      const decrypted = await self.decryptSubtitles(subtitle.subtitleId, subtitle.iv, subtitle.data)
      const data = await self.decompress(decrypted)
      const json = await xmlToJson(data)

      const title = subtitle.title
      var label = title.substr(0, title.indexOf('(')).trim()
      var language = title.substring(label.length + 2, title.indexOf(')')).toLowerCase()
      if (label.length === 0) {
        label = title
        language = title.substring(0, 2).toLowerCase()
      }

      const ass = await Episode.convertToASS(json)
      return new Subtitle(label, language, ass)
    }

    const promises = this.subtitles.map(entry => processSubtitle(entry))
    this.subtitles = await Promise.all(promises)
    return this.subtitles
  }

  static async convertToASS (content) {
    var json
    if (typeof content !== 'object') {
      json = await xmlToJson(content)
    } else {
      json = content
    }
    // Convert to ASS
    return script(json) + '\n' + style(json.styles) + '\n' + event(json.events)

    /**
     * Converts the event block.
     */
    function event(block) {
      const format = 'Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text';

      return '[Events]\n' +
        'Format: ' + format + '\n' + [].concat(block.event).map((style) => ('Dialogue: 0,' +
          style.$.start + ',' +
          style.$.end + ',' +
          style.$.style + ',' +
          style.$.name + ',' +
          style.$.margin_l + ',' +
          style.$.margin_r + ',' +
          style.$.margin_v + ',' +
          style.$.effect + ',' +
          style.$.text)).join('\n') + '\n';
    }

    /**
     * Converts the script block.
     */
    function script(block) {

      return '[Script Info]\n' +
        'Title: ' + block.$.title + '\n' +
        'ScriptType: v4.00+\n' +
        'WrapStyle: ' + block.$.wrap_style + '\n' +
        'PlayResX: ' + block.$.play_res_x + '\n' +
        'PlayResY: ' + block.$.play_res_y + '\n' +
        'Subtitle ID: ' + block.$.id + '\n' +
        'Language: ' + block.$.lang_string + '\n' +
        'Created: ' + block.$.created + '\n';
    }

    /**
     * Converts the style block.
     */
    function style(block) {
      const format = 'Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,' +
        'OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,' +
        'ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,' +
        'MarginL,MarginR,MarginV,Encoding';

      return '[V4+ Styles]\n' +
        'Format: ' + format + '\n' + [].concat(block.style).map((style) => 'Style: ' +
          style.$.name + ',' +
          style.$.font_name + ',' +
          style.$.font_size + ',' +
          style.$.primary_colour + ',' +
          style.$.secondary_colour + ',' +
          style.$.outline_colour + ',' +
          style.$.back_colour + ',' +
          style.$.bold + ',' +
          style.$.italic + ',' +
          style.$.underline + ',' +
          style.$.strikeout + ',' +
          style.$.scale_x + ',' +
          style.$.scale_y + ',' +
          style.$.spacing + ',' +
          style.$.angle + ',' +
          style.$.border_style + ',' +
          style.$.outline + ',' +
          style.$.shadow + ',' +
          style.$.alignment + ',' +
          style.$.margin_l + ',' +
          style.$.margin_r + ',' +
          style.$.margin_v + ',' +
          style.$.encoding).join('\n') + '\n';
    }
  }

  async getSubtitleInfo () {
    const self = this
    const response = await this.apiRequest({
      req: 'RpcApiSubtitle_GetListing',
      media_id: this.episodeID,
      video_format: 103,
      video_quality: 61
    })

    const data = await xmlToJson(response.data)
    const sources = data.subtitle
    self.subtitles = []
    sources.forEach((entry) => {
      const entryData = entry.$
      self.subtitles.push({
        title: entryData.title.substr(entryData.title.indexOf(']') + 2),
        apiUrl: entryData.link,
        subtitleId: entryData.id
      })
    })

    // Now we have the links for each subtitle
    // Fetch link to get each subtitle's IV and data
    async function getInfo (subtitle) {
      const uri = new URI(subtitle.apiUrl)
      const query = uri.query(true)
      const response = await self.apiRequest(query)
      const data = await xmlToJson(response.data)
      subtitle.iv = data.iv
      subtitle.data = data.data
    }

    const promises = []
    self.subtitles.forEach((subtitle, idx) => {
      const promise = getInfo(subtitle, idx)
      promises.push(promise)
    })
    await Promise.all(promises)
  }

  async generateKey (subtitleID) {
    const eq1 = Math.floor(Math.sqrt(6.9) * Math.pow(2, 25)) ^ subtitleID
    const eq2 = Math.floor(Math.sqrt(6.9) * Math.pow(2, 25))
    const eq3 = ((subtitleID ^ eq2) ^ (subtitleID^eq2)>>3 ^ eq1*32) >>>0
    // Create a 160-bit SHA1 hash
    const hashString = createString([20, 97, 1, 2]) + eq3
    const hashData = new TextEncoder('ascii').encode(hashString)
    const key = new Buffer(32)
    key.fill(0)
    crypto.createHash('sha1').update(hashString).digest().copy(key)
    return {
      eq1,
      eq2,
      eq3,
      hashString,
      hashData,
      key: key
    }
  }

  decodeBase64 (str) {
    return Array.from(Uint8Array.from(atob(str), c => c.charCodeAt(0)))
  }

  async getSubtitleData (subtitleID) {

  }
  async decryptSubtitles (subtitleID, ivBase64, dataBase64) {
    const { key } = await this.generateKey(subtitleID)

    const ivBuf = new Buffer(ivBase64, 'base64')
    const dataBuf = new Buffer(dataBase64, 'base64')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, ivBuf)
    decipher.setAutoPadding(false)
    return Buffer.concat([decipher.update(dataBuf), decipher.final()])
  }

  async decompress (data) {
    return new Promise((resolve, reject) => {
      zlib.inflate(data, (err, result) => {
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  }
}

export default Episode
