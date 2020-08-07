import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({isAuthenticated, logout}) => {
    let logoutUser = () => {
        logout()
    }

    const authLinks = (
        <Fragment>
            <ul>
                <li>
                    <Link to='/dashboard'>Expensify</Link>
                </li>
                <li>
                    <a onClick={logoutUser} href='/'>LogOut</a>
                </li>
            </ul>
        </Fragment> 
      )
    
      const guestLinks = (
        <Fragment>
            <ul>
                <li>
                    <Link to='/register'>Register</Link>
                </li>
                <li>
                    <Link to='/'>Login</Link>
                </li>
            </ul>
        </Fragment>
      );
    return (
        <Fragment style={{backgroundColor: 'red'}}>
            <h2>Expensify</h2>
            {isAuthenticated ? authLinks: guestLinks}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  

export default connect(mapStateToProps, {logout})(Navbar)