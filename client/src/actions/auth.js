import { 
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_LOADING
 } from '../reducers/types'
 import axios from 'axios'
 import { loadExpenses } from '../actions/expense'
 import { setAlert } from './alert'

 export const register = ({name, email, password}) => async dispatch => {
     const config = {
         headers: {
            'Content-Type': 'application/json'
         }
     }

     const body = JSON.stringify({name, email, password})

     try {
        const res = await axios.post('/api/user', body , config)
        
        dispatch({
            type: REGISTER_SUCCESS,
            payload: {token: res.data.token}
        })
     } catch (error) {
        const errorMsg = error.response.data
        dispatch(setAlert(errorMsg, 'danger'))
        
        dispatch({
            type: REGISTER_FAILURE
        })
     }
 }

 export const login = ({email, password}) => async dispatch => {
     const config = {
         headers:{
             'Content-Type': 'application/json'
         }
     }

     const body = JSON.stringify({email, password})
     try{
        const res = await axios.post('/api/auth', body , config)
        
        dispatch({
            type: LOGIN_SUCCESS,
            payload: {token: res.data.token}
        })
        dispatch({
            type: SET_LOADING,
            loading: true
        })
        dispatch(loadExpenses())
     }catch(error){
         const errorMsg = error.response.data
         dispatch(setAlert(errorMsg, 'danger'))
         
         dispatch({
             type: LOGIN_FAILURE
         })
     }
 }

 export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    })
    try {
        await axios.post('/api/user/logout')
    } catch (error) {
        dispatch(setAlert('Could Not Log Out Please check '))
    }
}

export const setLoading = (loading) => dispatch => {
    dispatch({
        type: SET_LOADING,
        loading
    })
}