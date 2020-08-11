import React, { Fragment } from 'react'
import { connect } from 'react-redux'


const AddExpense = ({total}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div>
             <Link to='/add' style={{display: 'flex', flexDirection: 'row', paddingTop: 10}}>Add Expense</Link>
            </div>
            <p>Total Expenses this month is: {total}</p>
        </div>
    )
}

// const mapStateToProps = state => {
//     let total = 0
//     return {
//         total: state.expenses.forEach(expense => total+= expense.amount)
//     }
// }

const mapStateToProps = state => {
    let total = 0
    debugger
    return {
        total: state.expenses.forEach(expense => total += expense.amount)
    }
}

export default connect(mapStateToProps)(AddExpense)