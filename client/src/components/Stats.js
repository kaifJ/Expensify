import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as moment from 'moment'
import { setFilter } from '../actions/filters' 
import {loadMonthlyExpenses} from '../actions/expense'
import PieChart from './PieChart'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Stats = (props) => {
    const [startDate, setStartDate] = useState(new Date(props.date))
    let { expenses } = props 

    let onChangeDate = date => {
        setStartDate(date)
        
        props.setFilter({
            selectedDate: moment(date)
          })

        props.loadMonthlyExpenses({
            year: moment(date).year(), 
            month: moment(date).month()
        })
    }

    let total = 0
    let categories = {}
    expenses.forEach(({category, amount}) => {
        if(!categories.hasOwnProperty(category))
            categories = Object.assign(categories, {
                [category]: {
                    amount
                }
            })
        else categories[category].amount = categories[category].amount+amount
        total += amount
    })
    
    Object.keys(categories).forEach(key => categories[key]['percent'] = Math.round((categories[key].amount/total)*100))

    const ExampleCustomInput = ({ value, onClick }) => (
        <button className="stats__date__picker" onClick={onClick}>
          {value}
        </button>
    );

    const CategoryDetail = (props) => {
        let onClick = (category) => {
            props.setFilter({
                text: category[0],
                textFieldToSearch: 'category'
            })
            props.history.push('/dashboard')
        }

        return Object.entries(categories).sort((a,b) => {
            return a[1].amount > b[1].amount ? -1 : 1
        }).map(category => {
            return (
                <div 
                    className="stats__list__item"
                    onClick={() => onClick(category)}
                >
                    <button className="stats__list__percent__button">{`${category[1].percent}%`}</button>
                    <label className="stats__list__percent__text">{category[0]}</label>
                    <label className="stats__list__percent__text">{`$${category[1].amount}`}</label>
                </div>
            )
        })
    }
    
    return (
        <div className="stats-box">
            {expenses.length > 0 ? <PieChart categories={categories} total={total}/> : (
                 <div className="no-items__box">
                 <div className="no-items__icon">
                     <i class="fas fa-box-open"></i>
                 </div>
                 <label className="no-items__text">Nohting Here ! Get Started By Adding an expense</label>
             </div>
            )}
            <div>
                <DatePicker
                selected={startDate}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                onChange={date => onChangeDate(date)}
                customInput={<ExampleCustomInput />}
                />
            </div>
            <div className="stats__list">
                <CategoryDetail setFilter={props.setFilter} history={props.history}/>
            </div>
        </div>
    )
}

const maptStateToProps = state => ({
    expenses: state.expenses,
    date: state.expenses.length > 0 ? moment(state.expenses[0].date) : moment()
})

export default connect(maptStateToProps, {loadMonthlyExpenses, setFilter})(Stats)