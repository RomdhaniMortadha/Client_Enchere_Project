import axios from "axios";
import decode from "jwt-decode";

export const setToken = (token) => {
  axios.defaults.headers.common["Authorization"] = token;
};

export const apiBaseUrl="http://localhost:5000/"

export const userInfo = localStorage.getItem('token')?decode(localStorage.getItem('token')):null