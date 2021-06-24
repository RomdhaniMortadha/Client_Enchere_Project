import axios from '../axios-ordres'


export const getAllAdmin=()=>{

    return axios 
    .get('/admin/')
    .then(({data})=>{
return data
    })
    .catch((err)=>{
      console.error(err.message)
    })
  }

  export const DelteAdmin=(id)=>{
    
  return axios
  .delete(`/admin/delte/${id}`)
  .then(({data})=>{
    return data
  })
  .catch((err)=>{
    console.error(err.message)
  })
  }