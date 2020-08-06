import { combineReducers } from 'redux' 
import authReducer from './auth'
import filterReducer from './filter'
import alertReducer from './alert'
import expenseReducer from './alert'

export default combineReducers({
    auth: authReducer,
    filter: filterReducer,
    alert: alertReducer,
    expense: expenseReducer
})