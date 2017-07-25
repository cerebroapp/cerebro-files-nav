import React from 'react'
import os from 'os'
import Preview from './Preview'
import readDir from './lib/readDir'
import { search } from 'cerebro-tools'

const DIR_REGEXP = /^([a-z]:)?[\\/](.*[\\/])*(.*)/i
const HOME_DIR_REGEXP = /^~/
const USER_PATH = os.homedir().trim('/').trim('\\')

/**
 * Do not show some files in results, i.e. system files
 *
 * @param  {String} fileName
 * @return {Boolean}
 */
const ignoreFile = (fileName) => (
  fileName.match(/^\./)
)

/**
 * Plugin to look and display local and external IPs
 * @param  {String} options.term
 * @param  {Function} options.display
 */
const filesPlugin = ({ term, actions, display }) => {
  let path = term
  let replaceHomePath = false
  if (path.match(HOME_DIR_REGEXP)) {
    path = path.replace(HOME_DIR_REGEXP, USER_PATH)
    replaceHomePath = true
  }
  const match = path.match(DIR_REGEXP)
  if (match) {
    const windowsDrive = match[1] || ''
    const dir = windowsDrive + (match[2] ? `/${match[2]}` : '/')
    const fileName = match[3]
    readDir(dir).then(files =>
      fileName ? search(files, fileName) : files
    ).then(files => {
      const result = []
      files.forEach(file => {
        if (ignoreFile(file)) return
        const filePath = [dir, file].join('')
        const autocomplete = replaceHomePath ? '~' + filePath.substr(USER_PATH.length) : filePath
        result.push({
          id: filePath,
          title: file,
          subtitle: filePath,
          clipboard: filePath,
          term: autocomplete,
          icon: filePath,
          onKeyDown: (event) => {
            if ((event.metaKey || event.ctrlKey) && event.keyCode === 82) {
              actions.reveal(filePath)
              event.preventDefault()
            }
          },
          onSelect: () => actions.open(`file://${filePath}`),
          getPreview: () => <Preview path={filePath} />
        })
      })
      display(result)
    })
  }
}

export default {
  fn: filesPlugin,
}
