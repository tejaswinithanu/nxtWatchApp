import {Component} from 'react'
import {AiOutlineClose, AiOutlineSearch} from 'react-icons/ai'

import Header from '../Header'
import SideBar from '../SideBar'
import ThemeContext from '../../context/ThemeContext'

import {
  BannerContainer,
  MainContainer,
  RightContainer,
} from './styledComponents'

class Home extends Component {
  state = {userInput: ''}

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  render() {
    const {userInput} = this.state
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
                  <BannerContainer data-testid="banner">
                    <div>
                      <img
                        alt="nxt watch logo"
                        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      />
                      <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                      <button type="button">GET IT NOW</button>
                    </div>
                    <button data-testid="close" type="button">
                      <AiOutlineClose />
                    </button>
                  </BannerContainer>
                  <div>
                    <div>
                      <input
                        value={userInput}
                        onChange={this.onChangeInput}
                        type="search"
                      />
                      <button data-testid="searchButton" type="button">
                        <AiOutlineSearch />
                      </button>
                    </div>
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
