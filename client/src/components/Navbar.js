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
            <Link to='/stats' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Stats</span>
            </Link>
            <a onClick={logoutUser} href='/'>LogOut</a>
        </Fragment> 
      )
    
      const guestLinks = (
        <Fragment>
            <Link to='/register' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Register</span>
                
            </Link>
            <Link to='/' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Login</span>
            </Link>
        </Fragment>
      );
    return (
        <div className="navbar-box">
            <Link to='/dashboard' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Expensify</span>
            </Link>
            {isAuthenticated ? authLinks: guestLinks}
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  

export default connect(mapStateToProps, {logout})(Navbar)