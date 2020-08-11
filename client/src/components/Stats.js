import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'
import {loadMonthlyExpenses} from '../actions/expense'
import PieChart from './PieChart'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const Stats = (props) => {
    const [startDate, setStartDate] = useState(new Date(props.date))
    let { expenses } = props 

    let onChangeDate = date => {
        props.loadMonthlyExpenses({
            year: moment(date).year(), 
            month: moment(date).month()
        })
        setStartDate(date)
    }

    
    let total = 0
    let categories = {}
    expenses.forEach(({category, amount}) => {
        if(!categories.hasOwnProperty(category))
            categories = Object.assign(categories, {
                [category]: amount
            })
        else categories[category] = categories[category]+amount
        total += amount
    })
    
    Object.keys(categories).forEach(key => categories[key] = Math.round((categories[key]/total)*100))
    
    return (
        <Fragment>
             <div>
                <DatePicker
                selected={startDate}
                onChange={date => onChangeDate(date)}
                dateFormat="MMM yyyy"
                showMonthYearPicker
                />
            </div>
            {expenses.length > 0 ? <PieChart categories={categories}/> : <p>Nothing Here</p>}
        </Fragment>
    )
}

const maptStateToProps = state => ({
    expenses: state.expenses,
    date: state.expenses.length > 0 ? moment(state.expenses[0].date) : moment()
})

export default connect(maptStateToProps, {loadMonthlyExpenses})(Stats)