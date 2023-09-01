import {Component} from 'react'
import ReactPlayer from 'react-player'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike, AiOutlineSave} from 'react-icons/ai'

import Header from '../Header'
import Sidebar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import {MainContainer, RightContainer} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    isLiked: false,
    isDisliked: false,
    isSaved: false,
    videoItemDetails: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async props => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/${id}`
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.video_details
      const updatedData = {
        id: fetchedData.id,
        title: fetchedData.title,
        videoUrl: fetchedData.video_url,
        thumbnailUrl: fetchedData.thumbnail_url,
        channel: {
          name: fetchedData.channel.name,
          profileImageUrl: fetchedData.channel.profile_image_url,
          subscriberCount: fetchedData.subscriber_count,
        },
        viewCount: fetchedData.view_count,
        publishedAt: fetchedData.published_at,
        description: fetchedData.description,
      }
      console.log(updatedData)
      this.setState({
        videoItemDetails: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVideoDetails = () => {
    const {videoItemDetails} = this.state
    const {
      title,
      videoUrl,
      channel,
      viewCount,
      publishedAt,
      description,
    } = videoItemDetails
    const {name, profileImageUrl, subscriberCount} = channel
    return (
      <div>
        <ReactPlayer url={videoUrl} controls />
        <p>{title}</p>
        <p>{viewCount} views</p>
        <p>{publishedAt}</p>
        <button type="button">
          <AiOutlineLike />
          Like
        </button>
        <button type="button">
          <AiOutlineDislike />
          Dislike
        </button>
        <button type="button">
          <AiOutlineSave />
          Save
        </button>
        <div>
          <hr />
        </div>
        <div>
          <img alt="channel logo" src={profileImageUrl} />
          <p>{name}</p>
          <p>{subscriberCount} subscribers</p>
          <p>{description}</p>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>we are having some trouble to complete your request.</p>
      <p>please try again.</p>
      <button type="button" onClick={this.getVideoDetails}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideoItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderVideoDetails()
      default:
        return this.renderFailureView()
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const bgColor = isDark ? '#0f0f0f' : '#f9f9f9'
          return (
            <div>
              <Header />
              <MainContainer>
                <Sidebar />
                <RightContainer data-testid="videoItemDetails" color={bgColor}>
                  {this.renderVideoItemDetails()}
                </RightContainer>
              </MainContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default VideoItemDetails
