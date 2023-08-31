import {Link} from 'react-router-dom'

import {
  VideoImg,
  ListItem,
  DetailsContainer,
  ProfileImg,
} from './styledComponents'

const VideoItem = props => {
  const {videoDetails} = props
  const {
    thumbnailUrl,
    title,
    channel,
    viewCount,
    publishedAt,
    id,
  } = videoDetails
  const {name, profileImageUrl} = channel
  return (
    <ListItem>
      <Link to={`/videos/${id}`}>
        <VideoImg src={thumbnailUrl} alt="video thumbnail" />
        <DetailsContainer>
          <ProfileImg src={profileImageUrl} alt="channel logo" />
          <div>
            <p>{title}</p>
            <p>{name}</p>
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </DetailsContainer>
      </Link>
    </ListItem>
  )
}

export default VideoItem
