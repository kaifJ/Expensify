import { combineReducers } from 'redux' 
import authReducer from './auth'
import filterReducer from './filter'
import alertReducer from './alert'
import expenseReducer from './expense'

export default combineReducers({
    auth: authReducer,
    filter: filterReducer,
    alert: alertReducer,
    expenses: expenseReducer
})