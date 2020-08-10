import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import ExpensesList from './ExpenseList'
import FilterComponent from './FilterComponent'

const Dashboard = () => {
    return (
        <div>
            <FilterComponent />
            <div style={{backgroundColor: 'green'}}>
                <p>Add new Expense</p>
                <Link to='/add'>Add Expense</Link>
            </div>
            <ExpensesList />
        </div>
    )
}

export default Dashboard