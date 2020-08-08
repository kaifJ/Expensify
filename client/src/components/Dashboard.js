import React, { Fragment, useEffect, useState } from 'react'
// import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import ExpensesList from './ExpenseList'

const Dashboard = () => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <div style={{backgroundColor: 'red'}}>
                <p>Search Box(By default by title)</p>
                <p>Date Filter</p>
                <p>Category Filter select</p>
            </div>
            <div style={{backgroundColor: 'green'}}>
                <p>Add new Expense</p>
                <Link to='/add'>Add Expense</Link>
            </div>
            <ExpensesList />
        </Fragment>
    )
}

export default Dashboard