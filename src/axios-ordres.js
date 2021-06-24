import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});
export const setToken = (token) => {
    axios.defaults.headers.common["Authorization"] = token;
  };

export default instance;