import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Expense from './Expense'
import expensesFilter from '../components/Selectors/expensesFilter'

const ExpenseList = props => {
    let expenses = props.expenses || []
    if(expenses.length === 0)
    return (
        <Fragment>
            No Expenses Get Started
        </Fragment>
    )
    return (
        <div style={{ height: '500px', overflowY: 'scroll' }}>
            {expenses.map(expense => <Expense key={expense._id} expense={expense}/>)}
        </div>      
        
    )
}

const mapStateToProps = state => ({
    expenses: expensesFilter(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpenseList)