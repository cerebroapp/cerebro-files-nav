import React from 'react'
import listArchive from './listArchive'
import FileDetails from '../../FileDetails'
import { Loading, Preload } from 'cerebro-ui'
import styles from '../styles/index.css'

const Archive = ({ path }) => {
  const renderer = (list, error) => {
    if (error) return <div>Error fetching archive</div>
    return (
      <div className={styles.previewArchive}>
        <div className={styles.filesListText}>Files:</div>
        <ul key={path}>{list.map(file => <li>{file}</li>)}</ul>
        <FileDetails path={path} />
      </div>
    )
  }
  return (
    <Preload promise={listArchive(path)} loader={<Loading />}>
      {renderer}
    </Preload>
  )
}

Archive.propTypes = {
  path: React.PropTypes.string.isRequired,
}

export default Archive
