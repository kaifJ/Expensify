import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => (
    <Fragment style={{backgroundColor: 'red'}}>
        <h2>Expensify</h2>
       <Fragment>
            <NavLink exact to='/'>Login</NavLink>
            <NavLink exact to='/register'>Register</NavLink>
       </Fragment>
    </Fragment>
)

export default Navbar