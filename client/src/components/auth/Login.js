import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

const Login = ({isAuthenticated, login}) =>{
    const [formData, setFormData] = useState({
      email: '',
      password: ''
    })

    let { email, password } = formData

    let onSubmit = e => {
        e.preventDefault()
        login({email, password})
    }

    if(isAuthenticated){
      return <Redirect to='/dashboard' />
    }
    return (
        <Fragment>
        <form onSubmit={e => onSubmit(e)}>
         <div>
           <input
             type="email"
             placeholder="Email Address"
             name="email"
             required
           />
         </div>
         <div>
           <input
             type="password"
             placeholder="Password"
             name="password"
             required
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

export default connect(mapStateToProps, { setAlert })(Login)