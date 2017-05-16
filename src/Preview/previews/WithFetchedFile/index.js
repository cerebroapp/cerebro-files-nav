import React, { PropTypes } from 'react'
import { Loading, Preload } from 'cerebro-ui'
import readFile from './readFile'
import { memoize } from 'cerebro-tools'

const WithFetchedFile = ({ path, options, children }) => {
  const renderer = (source, error) => {
    if (error) return <div>Error fetching file</div>
    return children(source)
  }
  return (
    <Preload loader={<Loading />} promise={readFile(path, options)}>
      {renderer}
    </Preload>
  )
}

WithFetchedFile.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  options: PropTypes.object,
}

export default memoize(WithFetchedFile)
