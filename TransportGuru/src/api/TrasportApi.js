import axios from 'axios'
export default axios.create({
    baseURL: "https://transportapi-aj.herokuapp.com",
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json',
        
    },

});