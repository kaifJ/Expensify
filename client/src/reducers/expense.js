import { 
    ADDEXPENSE_SUCCESS, 
    LOAD_EXPENSE_SUCCESS, 
    DELETE_EXPENSE_SUCCESS,
    EDIT_EXPENSE_SUCCESS,
    LOAD_MONTHLY_EXPENSES
}  from '../reducers/types'
import * as moment from 'moment'

const initialState = []

export default function(state = initialState, action){
    switch(action.type){
        case EDIT_EXPENSE_SUCCESS:
            let updatedExpenses =  state.map(expense => {
                if(expense._id === action.payload.expense._id){
                    return action.payload.expense
                }else return expense
            })
            
            return updatedExpenses

        case DELETE_EXPENSE_SUCCESS:
            return state.filter(expense => expense._id !== action.payload.id)

        case LOAD_EXPENSE_SUCCESS:
            return [...action.payload.expenses]

        case LOAD_MONTHLY_EXPENSES:
            return [...action.payload.expenses]

        case ADDEXPENSE_SUCCESS: 
            let expenses = [...state]
            if(action.payload.selectedDate.month() === moment(action.payload.expense.date).month())
                expenses.unshift({...action.payload.expense})
            return expenses

        default: return state
    }
}