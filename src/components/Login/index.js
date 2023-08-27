import {Component} from 'react'

import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {BgContainer, FormContainer, LoginButton} from './styledComponents'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isPasswordShown: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    console.log(errorMsg)
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitDetails = async event => {
    event.preventDefault()
    this.setState({showSubmitError: false})
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({
      isPasswordShown: !prevState.isPasswordShown,
    }))
  }

  render() {
    const {
      username,
      password,
      showSubmitError,
      errorMsg,
      isPasswordShown,
    } = this.state

    const passwordType = isPasswordShown ? 'text' : 'password'
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <BgContainer height="100">
        <BgContainer height="0">
          <img
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          />
          <FormContainer onSubmit={this.onSubmitDetails}>
            <label htmlFor="username">USERNAME</label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              id="username"
              type="text"
              placeholder="Username"
            />
            <label htmlFor="password">PASSWORD</label>
            <input
              value={password}
              onChange={this.onChangePassword}
              id="password"
              type={passwordType}
              placeholder="Password"
            />
            <input onChange={this.onChangeCheckbox} type="checkbox" />
            <p>Show Password</p>
            <LoginButton type="submit">Login</LoginButton>
            {showSubmitError && <p>*{errorMsg}</p>}
          </FormContainer>
        </BgContainer>
      </BgContainer>
    )
  }
}

export default Login
