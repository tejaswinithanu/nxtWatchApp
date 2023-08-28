import styled from 'styled-components'

export const BgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: ${props => props.height}vh;
`

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const LoginButton = styled.button`
  width: 100%;
  background-color: #3b82f6;
  border: none;
  padding: 10px;
  color: #ffffff;
`
