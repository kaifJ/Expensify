import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import Expense from './Expense'

const ExpenseList = props => {
    
    let expenses = props.expenses || []
    if(expenses.length === 0)
    return (
        <Fragment>
            No Expenses Get Started
        </Fragment>
    )
    return (
        expenses.map(expense => <Expense key={expense._id} expense={expense}/>)
    )
}

const mapStateToProps = state => ({
    expenses: state.expenses
})

export default connect(mapStateToProps)(ExpenseList)