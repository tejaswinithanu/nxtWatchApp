import {Route, Switch} from 'react-router-dom'

import Login from './components/Login'
import Header from './components/Header'
import './App.css'

const Home = () => <p>Home</p>

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Header} />
    </Switch>
  </>
)

export default App
