import styled from 'styled-components'

export const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export const RightContainer = styled.div`
  width: 75vw;
  background-color: ${props => props.color};
  padding: 15px;
`
