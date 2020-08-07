import axios from "axios";

export default function(token){
    if(token)
        axios.defaults.headers.common['Authorization'] = token
    else 
        axios.defaults.headers.common['Authorization'] = null
}