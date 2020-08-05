import React, { Fragment } from 'react'

const Register = () => {

    let onSubmit = e => {
        e.preventDefault()
        console.log('OnSubmit of register')
    }

    return (
        <Fragment>
        <form onSubmit={e => onSubmit(e)}>
        <div>
           <input
             type="name"
             placeholder="Full Name"
             name="name"
             required
           />
         </div>
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
         <div>
           <input
             type="password"
             placeholder="Confirm Password"
             name="password1"
             required
           />
         </div>
         <input type="submit" value="Register" />
       </form>
     </Fragment>
    )
}

export default Register