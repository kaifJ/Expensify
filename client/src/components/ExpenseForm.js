import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import { addExpense, editExpense } from '../actions/expense'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

class ExpenseForm extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      title: props.expense?.title || '',
      description: props.expense?.description || '',
      category: props.expense?.category || '',
      amount: props.expense?.amount || '',
      date: props.expense ? moment(props.expense.date) : moment(),
      calandarFocused: false
    }
  }

  onSubmit = e => {
    e.preventDefault()
   
    let formData = {
      title: this.state.title,
      description: this.state.description,
      amount: this.state.amount,
      date: this.state.date.format(),
      category: this.state.category
    }
    
    this.props.match.url.includes('add') ?
      this.props.addExpense(formData, this.props.history) :
      this.props.editExpense(formData, this.props.expense._id, this.props.history)
  }


  onChange = ({name, value}) => {
    this.setState(() => ({[name]: value}))
  }

  render(){
    let formType = this.props.match.url.includes('add') ? 'Add Expense': 'Update Expense'
    return (
      <Fragment>
      <form onSubmit={this.onSubmit}>
      <div>
         <input
           type="number"
           placeholder="Amount"
           name="amount"
           required
           value={this.state.amount}
           onChange={(e) => this.onChange({name: e.target.name, value: e.target.value})}
         />
       </div>
       <div>
       <input
           type="name"
           placeholder="Note (Food, Shopping)"
           name="title"
           value={this.state.title}
           onChange={(e) => this.onChange({name: e.target.name, value: e.target.value})}
         />
       </div>
       <div>
         <input
           type="name"
           placeholder="Description (Breakfast, Shoes)"
           name="description"
           value={this.state.description}
           onChange={(e) => this.onChange({name: e.target.name, value: e.target.value})}
         />
       </div>
       <div>
        <label>Category</label>
        <select
          name="category"
          id="category"
          value={this.state.category || ''}
          onChange={e =>
            this.onChange({ name: e.target.name, value: e.target.value })
          }
        >
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
        <label>Date</label>
        <SingleDatePicker
          date={this.state.date}
          onDateChange={date => this.setState({ date })} 
          focused={this.state.calandarFocused}
          onFocusChange={({focused}) => this.setState({ calandarFocused: focused })}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
      </div>
       <input type="submit" value={`${formType}`} />
     </form>
   </Fragment>
  )
  }
}

const maptStateToProps = (state, props) => {
  return {
    expense: state.expenses.length > 0 && state.expenses.find(expense => expense._id === props.match.params.id)
  }
}

export default connect(maptStateToProps, { addExpense, editExpense })(ExpenseForm)