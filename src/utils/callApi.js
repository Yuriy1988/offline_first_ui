import axios from 'axios';
const API_URL = 'https://offlineserver4.herokuapp.com';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

export default function callApi(endpoint, method = 'get', body) {
  return axios[method](`${API_URL}/${endpoint}`, body );
}
