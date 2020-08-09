import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import * as moment from 'moment'
import { connect } from 'react-redux'
import { loadExpenses } from '../actions/expense'
import { sortFilters, searchFilters, resetFilters } from '../actions/filters'
import "react-datepicker/dist/react-datepicker.css"

const FilterComponent = (props) => {
    const [startDate, setStartDate] = useState(new Date())
    const [filterState, setFilterState] = useState({
        searchText: '',
        searchBy: '',
        selectedCategoryValue: ''
    })

    let {  sortIn } = props.filters
    let { searchText, searchBy, selectedCategoryValue } = filterState

    let onChangeDate = date => {
        props.loadExpenses({
            year: moment(date).year(), 
            month: moment(date).month()
        })
        setStartDate(date)
    }

    let toggleDateFilter = () => {
        props.sortFilters({
            sortBy: 'date',
            sortIn: sortIn ? sortIn*(-1) : 1
        })
    }

    let toggleAmountFilter = () => {
        props.sortFilters({
            sortBy: 'amount',
            sortIn: sortIn ? sortIn*(-1) : 1
        })
    }

    let onChange = e => setFilterState({
        ...filterState,
        [e.target.name]: e.target.value
    })

    let clearFilters = () => {
        setFilterState({
            searchText: '',
            searchBy: '',
            selectedCategoryValue: ''
        })
        props.resetFilters()
    }

    let onSubmit = e => {
        e.preventDefault()
        props.searchFilters({
            text: searchText,
            textFieldToSearch: searchBy
        })
    }
     
    return (
        <div style={{backgroundColor: 'red'}}>
            <div>
                <form onSubmit={e => onSubmit(e)}>
                    <input
                        type="name"
                        placeholder="Enter Search text here"
                        name="searchText"
                        value={searchText}
                        onChange={e=> onChange(e)}
                        required
                    />
                    <div>
                        <label>Search In</label>
                        <select
                            name="searchBy"
                            id="searchBy"
                            value={searchBy}
                            onChange={e => onChange(e)}
                            required
                        >
                            <option value="">--Please choose an option--</option>
                            <option value="category">Category</option>
                            <option value="description">Description</option>
                        </select>
                    </div>
                    {
                        searchBy === 'category' && (
                            <div>
                                <select
                                    name="category"
                                    id="category"
                                    value={selectedCategoryValue}
                                    onChange={e => {
                                        
                                        setFilterState({
                                            ...filterState,
                                            'searchText': e.target.options[e.target.selectedIndex].text,
                                            'selectedCategoryValue': e.target.value
                                        })
                                    }}
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
                        )
                    }
                    <input type="submit" value="Search" />
                </form>
            </div>
            <div>
                <button onClick={toggleDateFilter}>Date</button>
            </div>
            <div>
                <button onClick={toggleAmountFilter}>Amount</button>
            </div>
            <div>
                <button onClick={clearFilters}>Clear All Filters</button>
            </div>
            <div>
                <DatePicker
                selected={startDate}
                onChange={date => onChangeDate(date)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                />
            </div>
        </div>
    )
}

const maptStateToProps = state => ({
    filters: state.filters
})

export default connect(maptStateToProps, { loadExpenses, sortFilters, searchFilters, resetFilters })(FilterComponent)