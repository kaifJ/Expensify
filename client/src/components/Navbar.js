import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

const Navbar = ({isAuthenticated, logout}) => {
    let logoutUser = () => {
        logout()
    }

    const authLinks = (
        <div>
            <a className="navbar-link__anchor" onClick={logoutUser} href='/'>Logout</a>
            <Link to='/stats' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Stats</span>
            </Link>
        </div> 
      )
    
      const guestLinks = (
        <div>
            <Link to='/register' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Register</span>
                
            </Link>
            <Link to='/' style={{textDecoration: 'none'}}>
                <span className="navbar-link">Login</span>
            </Link>
        </div>
      );
    return (
        <div className="navbar-box">
            <div className={isAuthenticated ? "navbar-box__content_header" : ""}>
                <div className="navbar-box__content">
                <Link to='/dashboard' style={{textDecoration: 'none'}}>
                 <span className="navbar-link__expensify">Expensify</span>
                </Link>
                {isAuthenticated ? authLinks: guestLinks}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  })
  

export default connect(mapStateToProps, {logout})(Navbar)