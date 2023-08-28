import styled from 'styled-components'

export const HeaderContainer = styled.div`
  padding: ${props => props.space}px;
  display: flex;
  flex-direction: row;
  justify-content: ${props => props.position};
  align-items: center;
`

export const BrandLogo = styled.img`
  width: 100px;
  height: 30px;
`

export const HeaderButton = styled.button`
  margin: 0px 10px;
`
export const ProfileImg = styled.img`
  width: 20px;
  height: 20px;
`
export const LogoutBtn = styled.button`
  border: 1px solid #3b82f6;
  background-color: transparent;
  color: #3b82f6;
  padding: 10px;
`
