import {Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {FaAffiliatetheme} from 'react-icons/fa'

import ThemeContext from '../../context/ThemeContext'

import {
  HeaderContainer,
  BrandLogo,
  HeaderButton,
  ProfileImg,
  LogoutBtn,
} from './styledComponents'

const Header = () => (
  <ThemeContext.Consumer>
    {value => {
      const {changeTheme} = value
      return (
        <HeaderContainer as="nav" space="15" position="space-between">
          <Link to="/">
            <BrandLogo
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            />
          </Link>
          <HeaderContainer as="ul" space="0" position="space-around">
            <li>
              <HeaderButton data-testid="theme">
                <FaAffiliatetheme />
              </HeaderButton>
            </li>
            <li>
              <ProfileImg
                alt="profile"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              />
            </li>
            <li>
              <Popup
                modal
                trigger={
                  <LogoutBtn className="trigger-button" type="button">
                    Logout
                  </LogoutBtn>
                }
              >
                {close => (
                  <>
                    <div>
                      <p>Are you sure, you want to Logout?</p>
                    </div>
                    <button
                      type="button"
                      className="trigger-button"
                      onClick={() => close()}
                    >
                      Close
                    </button>
                    <button type="button">Confirm</button>
                  </>
                )}
              </Popup>
            </li>
          </HeaderContainer>
        </HeaderContainer>
      )
    }}
  </ThemeContext.Consumer>
)

export default Header
