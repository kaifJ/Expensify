import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import { login } from '../../actions/auth'
import Alert from '../Alert'

const Login = ({isAuthenticated, login}) =>{
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })

    let { email, password } = formData

    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }

    let onSubmit = e => {
        e.preventDefault()
        login({email, password})
    }

    let onChange = e => setFormData({...formData, [e.target.name]: e.target.value})
   
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
              <input className="form-button" type="submit" value="Login" />
            </form>
            <div>
              <label>Don't have an Account? </label>
              <Link to='/register'>Register</Link>
            </div>
          </div>
         </div>
      </div>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)