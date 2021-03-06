import React, {Fragment} from 'react'
import { connect } from 'react-redux'

const Alert = (props) => {
    return (
        <Fragment>
            {props.alerts.map(alert => (
                <div className={`alert-${alert.alertType}`}>
                    {alert.alertType === 'success' ? <label className="alert-label-success">{alert.msg}</label> : <label className="alert-label">{alert.msg}</label>}
                </div>
            ))}
        </Fragment>
    )
}

const mapStateToProps = state => ({
    alerts: state.alert
})

export default connect(mapStateToProps)(Alert)