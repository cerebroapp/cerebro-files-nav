import React from 'react'

import Audio from './previews/Audio'
import Archive from './previews/Archive'
import Code from './previews/Code'
import Image from './previews/Image'
import Markdown from './previews/Markdown'
import Pdf from './previews/Pdf'
import Text from './previews/Text'
import Video from './previews/Video'

const IMAGE_REGEXP = /\.(jpg|jpeg|png|gif|bmp|svg)$/i
const VIDEO_REGEXP = /\.(mp4|mov|ogg)$/i
const AUDIO_REGEXP = /\.mp3$/i
const TEXT_REGEXP = /\.txt$/i
const ARCHIVE_REGEXP = /\.(tar|tar.gz|tgz|zip)$/i

// TODO: add more languages here
const CODE_REGEXP = /\.(js|rb|php|py|rake|css|coffee|yml|json|sh)$/i

// Map of regexp → component
const components = new Map([
  [IMAGE_REGEXP, Image],
  [VIDEO_REGEXP, Video],
  [AUDIO_REGEXP, Audio],
  [CODE_REGEXP, Code],
  [TEXT_REGEXP, Text],
  [ARCHIVE_REGEXP, Archive],
  [/\.md$/i, Markdown],
  [/\.pdf$/i, Pdf],
])

// TODO: add preview for directories
export default ({ path }) => {
  for (const [regexp, Component] of components) {
    if (path.match(regexp)) {
      return <Component path={path} key={path} />
    }
  }
  return null
}
