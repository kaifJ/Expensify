import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import { addExpense, editExpense } from '../actions/expense'

const ExpenseForm = props => {
    let { addExpense, editExpense, history, expense } = props

    useEffect(() => {
      if(expense){
        setFormData({
          ...formData,
          title: expense.title,
          description: expense.description,
          amount: expense.amount,
          category: expense.category,
          date: moment(expense.date).format('YYYY-DD-MM')
        })
      }
    },[expense])
    
    let [formData, setFormData] = useState({
        title: '',
        description: '',
        amount: '',
        category: '',
        date: moment(new Date()).format('YYYY-MM-DD')
    })

    let { title, description, amount, category, date } = formData
    let formType = props.match.url.includes('add') ? 'Add Expense': 'Update Expense'

    let onSubmit = e => {
        e.preventDefault()
        props.match.url.includes('add') ?
         addExpense({title, description, amount, category, date}, history) :
         editExpense({title, description, amount, category, date}, expense._id, history)
    }

    let onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
        <form onSubmit={e => onSubmit(e)}>
        <div>
           <input
             type="number"
             placeholder="Amount"
             name="amount"
             required
             value={amount}
             onChange={e => onChange(e)}
           />
         </div>
         <div>
         <input
             type="name"
             placeholder="Content"
             name="title"
             required
             value={title}
             onChange={e => onChange(e)}
           />
         </div>
         <div>
           <input
             type="name"
             placeholder="Description"
             name="description"
             value={description}
             onChange={e => onChange(e)}
           />
         </div>
         <div>
            <label>Category</label>
            <select name="category" id="category" value={category || ''} onChange={e => onChange(e)} >
                <option value="">--Please choose an option--</option>
                <option value="food">Food</option>
                <option value="social">Social Life</option>
                <option value="self">Self Development</option>
                <option value="transportation">Transportation</option>
                <option value="culture">Culture</option>
                <option value="household">Household</option>
                <option value="apparel">Apparel</option>
                <option value="beauty">Beauty</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="gift">Gift</option>
                <option value="other">Other</option>
            </select>
         </div>
         <div>
           <input
             type="date"
             placeholder="Date"
             name="date"
             required
             value={date}
             onChange={e => onChange(e)}
           />
         </div>
         <input type="submit" value={`${formType}`} />
       </form>
     </Fragment>
    )
}

const maptStateToProps = (state, props) => {
  
  return {
    expense: state.expenses.length > 0 && state.expenses.find(expense => expense._id === props.match.params.id)
  }
}

export default connect(maptStateToProps, { addExpense, editExpense })(ExpenseForm)