import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PieChart from './PieChart'

const Stats = () => {
    return (
        <div>
            <PieChart />
            <p>List of Category and total price</p>
        </div>
    )
}

export default Stats