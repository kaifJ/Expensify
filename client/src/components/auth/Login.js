import React, { Fragment } from 'react'

const Login = () =>{
   
    let onSubmit = e => {
        console.log('here')
        e.preventDefault()
        
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

export default Login