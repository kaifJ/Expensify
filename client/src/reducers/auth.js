import { 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    REGISTER_FAILURE, 
    REGISTER_SUCCESS, 
    LOGOUT 
} from './types'
 
const initialState = {
    isAuthenticated: !!localStorage.token,
    token: localStorage.getItem('token'),
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
                localStorage.setItem('token', action.payload.token)
                return {
                    ...state,
                    loading: false,
                    isAuthenticated: true,
                    token: action.payload.token
                }
        
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                token: null
            }
        default: return state
    }
}