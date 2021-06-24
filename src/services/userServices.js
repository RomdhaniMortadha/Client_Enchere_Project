import { setToken } from "../axios-ordres";
import axios from '../axios-ordres'
export const updateUser = (updateData) => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
    return axios
      .put("/user/update", updateData)
      .then((resData) => {
        localStorage.removeItem("token");
        localStorage.setItem("token", resData.data.token);
  
        return resData.data;
      })
      .catch((err) => {
        console.error(err);
      });
  };


  export const getAllUser=()=>{

    return axios 
    .get('/user/')
    .then(({data})=>{
return data
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }

  export const DelteUser=(id)=>{
    
  return axios
  .delete(`/user/${id}`)
  .then(({data})=>{
    return data
  })
  .catch((err)=>{
    console.error(err.message)
  })
  }
  
  export const getUser=(id)=>{
    
    return axios
    .get(`/user/${id}`)
    .then(({data})=>{
      return data
    })
    .catch((err)=>{
      console.error(err.message)
    })
    }