import React, { Fragment } from 'react'
// import { connect } from 'react-redux' 
import { Link } from 'react-router-dom'
import ExpensesList from './ExpenseList'
import FilterComponent from './FilterComponent'

const Dashboard = () => {
    return (
        <Fragment>
            <h1>Dashboard</h1>
            <FilterComponent />
            <div style={{backgroundColor: 'green'}}>
                <p>Add new Expense</p>
                <Link to='/add'>Add Expense</Link>
            </div>
            <ExpensesList />
        </Fragment>
    )
}

export default Dashboard