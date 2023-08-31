import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'

import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'
import VideoItem from '../VideoItem'

import {
  BannerContainer,
  MainContainer,
  RightContainer,
} from './styledComponents'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    isBannerOpen: true,
    userInput: '',
    videosList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getAllVideos()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderAllVideos = () => {
    const {videosList} = this.state
    return (
      <>
        {videosList.length === 0 ? (
          this.renderNoVideosView()
        ) : (
          <div>
            <ul>
              {videosList.map(eachVideo => (
                <VideoItem videoDetails={eachVideo} key={eachVideo.id} />
              ))}
            </ul>
          </div>
        )}
      </>
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

  renderNoVideosView = () => (
    <div>
      <img
        alt="no videos"
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.getAllVideos}>
        Retry
      </button>
    </div>
  )

  getAllVideos = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {userInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/videos/all?search=${userInput}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedVideos = data.videos
      const updatedData = fetchedVideos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        channel: {
          name: eachVideo.channel.name,
          profileImageUrl: eachVideo.channel.profile_image_url,
        },
        viewCount: eachVideo.view_count,
        publishedAt: eachVideo.published_at,
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

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  renderTheHomeRoute = () => {
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

  onCloseBanner = () => {
    this.setState({isBannerOpen: false})
  }

  render() {
    const {userInput, isBannerOpen} = this.state
    return (
      <ThemeContext.Consumer>
        {value => {
          const {isDark} = value
          const bgColor = isDark ? '#181818' : '#f9f9f9'
          return (
            <div>
              <Header />
              <MainContainer>
                <SideBar />
                <RightContainer data-testid="home" color={bgColor}>
                  {isBannerOpen && (
                    <BannerContainer data-testid="banner">
                      <div>
                        <img
                          alt="nxt watch logo"
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                        />
                        <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                        <button type="button">GET IT NOW</button>
                      </div>
                      <button
                        onClick={this.onCloseBanner}
                        data-testid="close"
                        type="button"
                      >
                        <AiOutlineClose />
                      </button>
                    </BannerContainer>
                  )}

                  <div>
                    <div>
                      <input
                        value={userInput}
                        onChange={this.onChangeInput}
                        type="search"
                      />
                      <button
                        onClick={this.getAllVideos}
                        data-testid="searchButton"
                        type="button"
                      >
                        <AiOutlineSearch />
                      </button>
                    </div>
                    {this.renderTheHomeRoute()}
                  </div>
                </RightContainer>
              </MainContainer>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}

export default Home
