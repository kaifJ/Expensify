import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/auth'

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
        <Fragment>
        <form onSubmit={e => onSubmit(e)}>
         <div>
           <input
             type="email"
             placeholder="Email Address"
             name="email"
             required
             value={email}
             onChange={e => onChange(e)}
           />
         </div>
         <div>
           <input
             type="password"
             placeholder="Password"
             name="password"
             required
             value={password}
             onChange={e => onChange(e)}
           />
         </div>
         <input type="submit" value="Login" />
       </form>
     </Fragment>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)