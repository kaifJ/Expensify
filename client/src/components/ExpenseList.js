import React, { useState, Fragment } from 'react'

const ExpenseList = () => {
    let expenses = []
    if(expenses.length === 0)
    return (
        <Fragment>
            No Expenses Get Started
        </Fragment>
    )
    return (
        <p>List Of expenses</p>
    )
}

export default ExpenseList