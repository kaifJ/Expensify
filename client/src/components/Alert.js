import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const Alert = (props) => {
    return (
        <div>
            {props.alerts.map(alert => (
                <div>
                    <p>{alert.msg}</p>
                </div>
            ))}
        </div>
    )
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)