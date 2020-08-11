import { 
    ADDEXPENSE_SUCCESS, 
    LOAD_EXPENSE_SUCCESS, 
    DELETE_EXPENSE_SUCCESS, 
    EDIT_EXPENSE_SUCCESS,
    LOAD_MONTHLY_EXPENSES 
}  from '../reducers/types'
import { setAlert } from '../actions/alert'
import { setLoading } from '../actions/auth'
import axios from 'axios'
import * as moment from 'moment'

export const editExpense = (updatedExpense, id, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({...updatedExpense})
        
        let res = await axios.patch(`/api/expense/${id}`, body, config)
        dispatch({
            type: EDIT_EXPENSE_SUCCESS,
            payload: { expense: res.data.expense}
        })
        history.push('/dashboard')
        dispatch(setAlert('Expense Updated', 'success'))
    } catch (error) {
        dispatch(setAlert('Some Error Look into this', 'danger'))
    }
}

export const addExpense = ({ title, description, amount, category, date }, history, selectedDate) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({title, description, amount, category, date})

    try {
        const res = await axios.post('/api/expense', body, config)
        
        dispatch({
            type: ADDEXPENSE_SUCCESS,
            payload: { expense: res.data.expense , selectedDate}
        })
        history.push('/dashboard')
        dispatch(setAlert('Expense Added', 'success'))
    } catch (error) {
        let errors = error.response.data.errors

        errors.forEach(error => dispatch(setAlert(error, 'danger')))
        dispatch(setAlert('Could Not Add Expense, Please Contact admin', 'danger'))
    }
}

export const deleteExpense = (id) => async dispatch => {
    try {
        await axios.delete(`/api/expense/${id}`)

        dispatch({
            type: DELETE_EXPENSE_SUCCESS,
            payload: {id}
        })
    } catch (error) {
        dispatch(setAlert('Some Error Look Into this', 'danger'))
    }
}

export const loadExpenses = () => async dispatch => {
    dispatch(setLoading(true))
    try{
        const params = {
            year: moment().year(),
            month: moment().month()
        }
        let res = await axios.get('/api/expense', {params})
        
        dispatch(setLoading(false))
        dispatch({
            type: LOAD_EXPENSE_SUCCESS,
            payload: { expenses: res.data.expenses }
        })
        
    }catch(error){
        let errors = error.response.data
        dispatch(setAlert(errors, 'danger'))
    }
}

export const loadMonthlyExpenses = (payload) => async dispatch => {
    dispatch(setLoading(true))
    try{
        const params = {
            year: payload.year,
            month: payload.month
        }
        let res = await axios.get('/api/expense', {params})

        dispatch(setLoading(false))
        dispatch({
            type: LOAD_MONTHLY_EXPENSES,
            payload: { expenses: res.data.expenses }
        })
        
    }catch(error){
        let errors = error.response.data
        dispatch(setAlert(errors, 'danger'))
    }
}