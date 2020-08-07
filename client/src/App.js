import React, { Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Navbar from './components/Navbar'
import { Login, Register, PageNotFound } from './components/auth'
import Dashboard from './components/Dashboard'
import { Provider } from 'react-redux'
import store from './store/store'
import Alert from './components/Alert'
import setAuthToken from './utils/setAuthToken'
import ExpenseForm from './components/ExpenseForm'
import PrivateRoute from './components/routing/PrivateRoute'

setAuthToken(localStorage.token)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Fragment>
          <Alert />
          </Fragment>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/addExpense' component={ExpenseForm} />
            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
