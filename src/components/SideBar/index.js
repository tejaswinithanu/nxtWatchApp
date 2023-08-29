import {Link} from 'react-router-dom'
import {AiFillHome, AiFillFire} from 'react-icons/ai'
import {SiYoutubegaming} from 'react-icons/si'
import {GiSaveArrow} from 'react-icons/gi'

import {BarContainer, TabButton, StyledImg} from './styledComponents'

const SideBar = () => (
  <BarContainer height="100" position="space-between">
    <BarContainer height="0" position="space-around">
      <Link to="/">
        <TabButton>
          <AiFillHome />
          <p>Home</p>
        </TabButton>
      </Link>
      <Link to="/trending">
        <TabButton>
          <AiFillFire />
          <p>Trending</p>
        </TabButton>
      </Link>
      <Link to="/gaming">
        <TabButton>
          <SiYoutubegaming />
          <p>Gaming</p>
        </TabButton>
      </Link>
      <Link to="/saved-videos">
        <TabButton>
          <GiSaveArrow />
          <p>Saved Videos</p>
        </TabButton>
      </Link>
    </BarContainer>
    <BarContainer height="0" position="space-around">
      <h1>CONTACT US</h1>
      <div>
        <StyledImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
          alt="facebook logo"
        />
        <StyledImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
          alt="twitter logo"
        />
        <StyledImg
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
          alt="linked in logo"
        />
      </div>
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </BarContainer>
  </BarContainer>
)

export default SideBar
