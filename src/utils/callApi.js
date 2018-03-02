import axios from 'axios';
export const API_URL = 'http://localhost:3001/data';

export default function callApi(endpoint, method = 'get', body, options = { isJSON: true }) {
  const headers = {};

  if (options.isJSON) {
    headers['content-type'] = 'application/json';
  }

  return axios(`${API_URL}/${endpoint}`, {
    headers,
    method,
    body: options.isJSON || method !== 'get' ? JSON.stringify(body) : body,
  });
}
