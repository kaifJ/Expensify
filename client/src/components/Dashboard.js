import React from 'react'
import ExpensesList from './ExpenseList'
import FilterComponent from './FilterComponent'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="dashboard--box">
            <div className="add-expense-box">
                <Link to='/add' className="add-expense-button">Add Expense</Link>
            </div>
            <FilterComponent />
            <ExpensesList />
        </div>
    )
}

export default Dashboard