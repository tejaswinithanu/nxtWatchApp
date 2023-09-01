import {Link} from 'react-router-dom'

import {ListItem, VideoImg} from './styledComponents'

const GamingVideoItem = props => {
  const {videoDetails} = props
  const {title, thumbnailUrl, viewCount, id} = videoDetails
  return (
    <ListItem>
      <Link to={`/videos/${id}`}>
        <VideoImg src={thumbnailUrl} alt="video thumbnail" />
        <p>{title}</p>
        <p>{viewCount} Watching Worldwide</p>
      </Link>
    </ListItem>
  )
}

export default GamingVideoItem
