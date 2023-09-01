import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {SiYoutubegaming} from 'react-icons/si'

import {Banner, MainContainer, RightContainer} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'
import Header from '../Header'
import Sidebar from '../SideBar'
import GamingVideoItem from '../GamingVideoItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Gaming extends Component {
  state = {videosList: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.getAllVideos()
  }

  getAllVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/gaming`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedVideos = data.videos
      const updatedData = fetchedVideos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({
        videosList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
      console.log(updatedData)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderAllVideos = () => {
    const {videosList} = this.state
    return (
      <div>
        <ul>
          {videosList.map(eachVideo => (
            <GamingVideoItem videoDetails={eachVideo} key={eachVideo.id} />
          ))}
        </ul>
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
      <button type="button" onClick={this.getAllVideos}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderTheGamingRoute = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderAllVideos()
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
                <RightContainer color={bgColor} data-testid="gaming">
                  <Banner>
                    <SiYoutubegaming />
                    <h1>Gaming</h1>
                  </Banner>
                  {this.renderTheGamingRoute()}
                </RightContainer>
              </MainContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Gaming
