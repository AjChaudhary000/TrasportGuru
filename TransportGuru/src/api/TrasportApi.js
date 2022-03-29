import axios from 'axios'
export default axios.create({
    baseURL: "http://192.168.200.123:5000",
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json' },

});