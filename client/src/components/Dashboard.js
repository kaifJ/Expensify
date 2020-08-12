import React from 'react'
import ExpensesList from './ExpenseList'
import FilterComponent from './FilterComponent'
import { Link } from 'react-router-dom'
import Alert from './Alert'

const Dashboard = () => {
    return (
        <div className="dashboard--box">
            <div className="add-expense-box">
                <Link to='/add' className="add-expense-button">Add Expense</Link>
            </div>
            <Alert />
            <FilterComponent />
            <ExpensesList />
        </div>
    )
}

export default Dashboard