import React, { useState } from 'react'
import DatePicker from "react-datepicker"
import * as moment from 'moment'
import { connect } from 'react-redux'
import { loadMonthlyExpenses } from '../actions/expense'
import { sortFilters, searchFilters, resetFilters, setFilter } from '../actions/filters'
import "react-datepicker/dist/react-datepicker.css"

const FilterComponent = (props) => {
    // const [startDate, setStartDate] = useState(new Date(props.date))
    const [filterState, setFilterState] = useState({
        searchText: '',
        searchBy: '',
        selectedCategoryValue: ''
    })

    let { sortIn, selectedDate, sortBy } = props.filters
    let { searchText, searchBy, selectedCategoryValue } = filterState

    let onChangeDate = date => {
        props.setFilter({
            selectedDate: moment(date)
        })
        props.loadMonthlyExpenses({
            year: moment(date).year(), 
            month: moment(date).month()
        })
        // setStartDate(date)
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
        <div className="filter-component__box">
            <div className="filter-component__body">
                <form className="filter-component__form" onSubmit={e => onSubmit(e)}>
                    <div className="filter-component__form__search__by">
                        <select
                        className="filter-component__form__select"
                        name="searchBy"
                        id="searchBy"
                        value={searchBy}
                        onChange={e => onChange(e)}
                        required
                        >
                        <option value="">Search By</option>
                        <option value="category">Category</option>
                        <option value="description">Description</option>
                        </select>
                    </div>
                    <div className="filter-component__form__search__by">
                    <select
                        className="filter-component__form__select"
                        name="category"
                        id="category"
                        disabled={searchBy !== 'category'}
                        value={selectedCategoryValue}
                        required
                        onChange={e => {
                            setFilterState({
                                ...filterState,
                                'searchText': e.target.options[e.target.selectedIndex].text,
                                'selectedCategoryValue': e.target.value
                            })
                        }}
                        >
                            <option value="">Select Category</option>
                            <option value="food">FOOD</option>
                            <option value="social">SOCIAL</option>
                            <option value="self">SELF</option>
                            <option value="transportation">TRANSPORTATION</option>
                            <option value="culture">CULTURE</option>
                            <option value="household">HOUSEHOLD</option>
                            <option value="apparel">APPAREL</option>
                            <option value="beauty">BEAUTY</option>
                            <option value="health">HEALTH</option>
                            <option value="education">EDUCATION</option>
                            <option value="gift">GIFT</option>
                            <option value="other">OTHER</option>
                        </select>
                    </div>
                    <div className="filter-component__form__search__by">
                        <input
                            className="filter-component__form__input"
                            type="name"
                            placeholder="Enter Search text here"
                            name="searchText"
                            value={searchText}
                            onChange={e=> onChange(e)}
                            required
                        />
                    </div>
                    <div className="filter-component__form__search__by">
                        <input className="filter-component__form__submit" type="submit" value="Filter" />
                    </div>
                </form>
                <div className="filter-component__sort">
                    <button className="filter-component__sort__button" onClick={toggleDateFilter}>
                        Date{(sortBy && sortBy === 'date') ? <span style={{paddingLeft: '5px'}}><i className={sortIn === -1 ? 'arrow up' : 'arrow down'}></i></span> : null}
                    </button>
                    <button className="filter-component__sort__button" onClick={toggleAmountFilter}>
                        Amount{(sortBy && sortBy === 'amount') ? <span style={{paddingLeft: '5px'}}><i className={sortIn === -1 ? 'arrow up' : 'arrow down'}></i></span> : null}
                    </button>
                    <DatePicker
                    className="picker"
                    selected={new Date(selectedDate)}
                    onChange={date => onChangeDate(date)}
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                    />
                    <button className="filter-component__sort__button" onClick={clearFilters}>Clear All Filters</button>
                </div>
            </div>
        </div>
    )
}

const maptStateToProps = state => ({
    filters: state.filters
})

export default connect(maptStateToProps, { 
    loadMonthlyExpenses, 
    sortFilters, 
    searchFilters, 
    resetFilters,
    setFilter
})(FilterComponent)