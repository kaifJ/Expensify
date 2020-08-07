import { ADDEXPENSE_SUCCESS }  from '../reducers/types'

const initialState = []

export default function(state = initialState, actions){
    switch(actions.type){
        case ADDEXPENSE_SUCCESS: 
            let expenses = [...state]
            expenses.unshift({...actions.payload.expense})
        default: return state
    }
}