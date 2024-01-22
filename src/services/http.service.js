import Axios from 'axios';
import { getLocalStorage } from './localStorage.service';

const baseURL = 'http://localhost:3000'; // Replace with your API base URL
const axios = Axios.create({
  withCredentials: true
})

function setAuthToken(token) {
  axios.defaults.headers.common['Authorization'] = getLocalStorage("linkedin8132cookie")?.token;
}

function get(url, params = {}) {
  return axios.get(`${baseURL}/${url}`, { params })
    .then(response => response.data)
    .catch(error => { throw error; });
}

function post(url, data = {}, isReturnRes) {
  return axios.post(`${baseURL}/${url}`, data)
    .then(response => isReturnRes ? response : response.data)
    .catch(error => { throw error; });
}

function put(url, data = {}) {
  return axios.put(`${baseURL}/${url}`, data)
    .then(response => response.data)
    .catch(error => { throw error; });
}

function del(url) {
  return axios.delete(`${baseURL}/${url}`)
    .then(response => response.data)
    .catch(error => { throw error; });
}

export {
  get,
  post,
  put,
  del,
  setAuthToken
};
