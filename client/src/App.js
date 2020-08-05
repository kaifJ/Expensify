import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login, Register, PageNotFound } from './components/auth'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <Router>
      <Navbar />
      <h1>Rect App</h1>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
