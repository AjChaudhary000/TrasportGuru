import axios from 'axios'
import config from '../Config/config';
export default axios.create({
    baseURL: config.BaseUrl,
    headers: {
        'X-Requested-With': 'XMLHttpRequest', 'Accept': 'application/json',

    },

});