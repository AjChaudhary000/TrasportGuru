import axios from 'axios'
import { getJWTToken } from '../Redux/helper';
export default axios.create({
    baseURL: "http://192.168.200.123:5000",
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json',
        // Authorization: `Bearer ${getJWTToken()}`,
    },

});