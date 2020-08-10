import React, { Fragment, useState } from 'react'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import Alert from '../Alert'

const Register = ({isAuthenticated, setAlert, register}) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password1: ''
    })

    let { name, email, password, password1} = formData

    let onSubmit = e => {
        e.preventDefault()
        if(password1 !== password)
          setAlert('Passwords Don\'t match', 'danger')
        else register({name, email, password})
    }

    let onChange = e => setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }

    return (
        <div className="box-layout">
        <div className="horizontal-box">
        <Alert />
         <div className="box-layout__box">
            <form onSubmit={e => onSubmit(e)}>
              <div>
              <label className="required">*</label>
                <input
                  className="form-input"
                  type="name"
                  placeholder="Full Name"
                  name="name"
                  required
                  value={name}
                  onChange={e => onChange(e)}
                />        
              </div>
              <div>
              <label className="required">*</label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  required
                  value={email}
                  onChange={e => onChange(e)}
                />
              </div>
             <div>
             <label className="required">*</label>
              <input
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={password}
                  onChange={e => onChange(e)}
                />
             </div>
             <div>
             <label className="required">*</label>
              <input
                  className="form-input"
                  type="password"
                  placeholder="Confirm Password"
                  name="password1"
                  required
                  value={password1}
                  onChange={e => onChange(e)}
                />
             </div>
              <input className="form-button" type="submit" value="Register" />
            </form>
            <div>
              <label>Already have an Account? </label>
              <Link to='/'>Login</Link>
            </div>
          </div>
        </div>
        </div>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)