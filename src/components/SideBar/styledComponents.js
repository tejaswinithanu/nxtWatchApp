import styled from 'styled-components'

export const BarContainer = styled.div`
  width: 25vw;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.position};
`

export const TabButton = styled.button`
  background-color: transparent;
  border: none;
`
export const StyledImg = styled.img`
  width: 20px;
  height: 20px;
  margin: 10px;
`
