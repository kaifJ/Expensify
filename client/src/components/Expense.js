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
       <div className="expense-item">
           <div className="expense-item__box">
                <div className="expense-item__info">
                    <label>{`$${props.expense.amount}`}</label>
                    <label>{props.expense.description}</label>
                    <label>{props.expense.category}</label>
                    <label>{moment(props.expense.date).format('ddd MMM DD YYYY')}</label>
                </div>
                <div className="expense-item__action__buttons">
                    <button className="delete-expense" onClick={() => deleteExpense(props.expense._id)}>Delete Expense</button>
                    <Link className="edit-expense" to={`/edit/${props.expense._id}`}>Edit Expense</Link>
                </div>
            </div>
            <hr className="separator" />
       </div>
    )
}

export default connect(null, { deleteExpense })(Expense)