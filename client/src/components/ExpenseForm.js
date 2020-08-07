import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { addExpense } from '../actions/expense'

const ExpenseForm = ({ addExpense, history }) => {
    const [formData, setFormData] = useState({
        title:'',
        description: '',
        amount:'',
        category:'',
        date: new Date()
    })

    let { title, description, amount, category, date } = formData

    let onSubmit = e => {
        e.preventDefault()
        debugger
        addExpense({title, description, amount, category, date}, history)
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
            <select name="category" id="category" onChange={e => onChange(e)}>
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
         <input type="submit" value="Add Expeonse" />
       </form>
     </Fragment>
    )
}

export default connect(null, { addExpense })(ExpenseForm)