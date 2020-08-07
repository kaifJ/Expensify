import React from 'react'
import { connect } from 'react-redux' 
import { Redirect } from 'react-router-dom'

const Dashboard = ({isAuthenticated}) => {
    debugger
    if(!isAuthenticated){
        return <Redirect to='/' />
    }

    return (
        <h1>Dashboard</h1>
    )
}

const maptStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(maptStateToProps)(Dashboard)