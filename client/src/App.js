import React, { Fragment, useEffect } from 'react'
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
import { loadExpenses } from './actions/expense'
import Stats from './components/Stats'

setAuthToken(localStorage.token)

function App() {
  useEffect(() => {
    localStorage.token && store.dispatch(loadExpenses())
  },[])

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
            <PrivateRoute exact path='/add' component={ExpenseForm} />
            <PrivateRoute exact path='/edit/:id' component={ExpenseForm} />
            <PrivateRoute exact path='/stats' component={Stats} />
            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
