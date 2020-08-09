import { SORT_FILTERS, RESET_FILTERS, SEARCH_FILTERS } from '../reducers/types'

export const sortFilters = ({sortBy, sortIn}) => dispatch => {
    dispatch({
        type: SORT_FILTERS,
        payload: {
            sortBy,
            sortIn
        }
    })
}

export const searchFilters = ({ text, textFieldToSearch }) => dispatch =>{
    dispatch({
        type: SEARCH_FILTERS,
        payload: {
            text,
            textFieldToSearch
        }
    })
}

export const resetFilters = () => dispatch => {
    dispatch({
        type: RESET_FILTERS
    })
}