import styled from 'styled-components'

export const Banner = styled.div`
  width: 100%;
  background-color: #f8fafc;
  display: flex;
  flex-direction: row;
  padding: 20px;
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
