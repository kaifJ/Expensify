import React from 'react'
import * as moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteExpense } from '../actions/expense'
import {
    Dialog,
    Button,
    DialogActions,
    DialogTitle
} from '@material-ui/core';

const Expense = (props) => {
    const [open, setOpen] = React.useState(false);

    // onClick={() => deleteExpense(props.expense._id)}

    let handleClickOpen = () => {
        setOpen(true)
    }

    let onNegativeResponse = () => {
        setOpen(false)
    }

    let onPositiveResponse = id => {
        deleteExpense(id)
        onNegativeResponse()
    }

    let deleteExpense = (id) => {
        props.deleteExpense(id)
    }

    return (
       <div className="expense-item">
           <div className="expense-item__box">
                <div className="expense-item__info">
                    <label className="expense-item__element">{`$${props.expense.amount}`}</label>
                    <label className="expense-item__element">{props.expense.description}</label>
                    <label className="expense-item__element">{props.expense.category}</label>
                    <label className="expense-item__element">{moment(props.expense.date).format('ddd MMM DD YYYY')}</label>
                </div>
                <div className="expense-item__action__buttons">
                    <button className="delete-expense" onClick={handleClickOpen}>Delete Expense</button>
                    <Dialog
                        open={open}
                        onClose={onNegativeResponse}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title"><span style={{fontSize: '26px'}}>Delete Expense?</span></DialogTitle>
                        <DialogActions>
                        <Button style={{fontSize: '16px'}} onClick={onNegativeResponse} color="primary">
                            Cancel
                        </Button>
                        <Button style={{fontSize: '16px'}} onClick={() => onPositiveResponse(props.expense._id)} color="primary" autoFocus>
                            Delete
                        </Button>
                        </DialogActions>
                    </Dialog>
                    <Link className="edit-expense" to={`/edit/${props.expense._id}`}>Edit Expense</Link>
                </div>
            </div>
            <hr className="separator" />
       </div>
    )
}

export default connect(null, { deleteExpense })(Expense)