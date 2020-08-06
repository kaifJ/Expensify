import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => (
    <Fragment>
        <h3>404 Error! Page Not found</h3>
        <Link exact to='/dashboard'>Dashboard</Link>
    </Fragment>
)

export default PageNotFound