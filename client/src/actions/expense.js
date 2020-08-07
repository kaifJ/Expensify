import { ADDEXPENSE_SUCCESS }  from '../reducers/types'
import { setAlert } from '../actions/alert'
import axios from 'axios'

export const addExpense = ({ title, description, amount, category, date }, history) => async dispatch => {
    debugger
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({title, description, amount, category, date})

    try {
        const res = await axios.post('/api/expense', body, config)
        debugger
        dispatch({
            type: ADDEXPENSE_SUCCESS,
            payload: { expense: res.data.expense}
        })
        history.push('/dashboard')
        dispatch(setAlert('Expense Added', 'success'))
    } catch (error) {
        let errors = error.response.data.errors

        errors.forEach(error => dispatch(setAlert(error, 'danger')))
        dispatch(setAlert('Could Not Add Expense, Please Contact admin', 'danger'))
    }
}