import React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteExpense } from '../actions/expense'

const Expense = (props) => {

    let deleteExpense = (id) => {
        props.deleteExpense(id)
    }

    return (
       <div style={{backgroundColor: ' #add8e6'}}>
        <p>{props.expense.description}</p>
        <p>{props.expense.amount}</p>
        <p>{props.expense.category}</p>
        <p>{moment(props.expense.date).format('ddd MMM DD YYYY')}</p>
        <button onClick={() => deleteExpense(props.expense._id)}>Delete Expense</button>
        <Link to={`/edit/${props.expense._id}`}>Edit Expense</Link>
       </div>
    )
}

export default connect(null, { deleteExpense })(Expense)