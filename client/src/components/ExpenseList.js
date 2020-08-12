import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Expense from './Expense'
import Spinner from './spinner/Spinner'
import expensesFilter from '../components/Selectors/expensesFilter'

const ExpenseList = props => {
    let expenses = props.expenses || []
    if(props.loading) return (
        <Fragment>
            <Spinner />
        </Fragment>
    )
    if(expenses.length === 0)
    return (
        <div className="no-items__box">
            <div className="no-items__icon">
                <i class="fas fa-box-open"></i>
            </div>
            <label className="no-items__text">Nohting Here ! Get Started By Adding an expense</label>
        </div>
    )
    return (
        <div className="expense-list__box">
            {expenses.map(expense => <Expense key={expense._id} expense={expense}/>)}
        </div>      
        
    )
}

const mapStateToProps = state => ({
    expenses: expensesFilter(state.expenses, state.filters),
    loading: state.auth.loading
})

export default connect(mapStateToProps)(ExpenseList)