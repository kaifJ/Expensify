import { 
    SORT_FILTERS, 
    RESET_FILTERS, 
    SEARCH_FILTERS
} from '../reducers/types'

const initialState = {
    sortBy: null,
    sortIn: null,
    text: null,
    textFieldToSearch: null
}

export default function(state = initialState, action){
    switch(action.type){
        case SEARCH_FILTERS: return {
            ...state,
            text: action.payload.text,
            textFieldToSearch: action.payload.textFieldToSearch
        }

        case RESET_FILTERS: return {
            sortBy: null,
            sortIn: null,
            text: null,
            textFieldToSearch: null
        }

        case SORT_FILTERS:
        
            return {
                ...state,
                sortBy: action.payload.sortBy,
                sortIn: action.payload.sortIn
            }
        default: return state
    }
}