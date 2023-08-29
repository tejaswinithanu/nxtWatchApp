import styled from 'styled-components'

export const BannerContainer = styled.div`
  padding: 10px;
  width: 100%;
  height: 200px;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`
export const RightContainer = styled.div`
  width: 75vw;
  background-color: ${props => props.color};
`
