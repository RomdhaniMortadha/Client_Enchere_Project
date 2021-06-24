import * as actionTypes from "./actionTypes";
import axios from "../../axios-ordres";
import decode from "jwt-decode"

export const setData = (token) => {
  return {
    type: actionTypes.SET_DATA,

    token,
  };
};

export const setUser = (signup_data) => {
  return {
    type: actionTypes.SIGNUP,
    login_data: signup_data,
  };
};

export const fetchAuthFailed = () => {
  return {
    type: actionTypes.AUTH_FAILED,
  };
};

export const fetchSignupFailed = () => {
  return {
    type: actionTypes.SIGNUP_FAILED,
  };
};


export const setIsLodaingUser = () => {
  return {
    type: actionTypes.ISLOADING_CONNECTION,
  };
};

export const autologout=()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('expirationdate')
  return{
    type:actionTypes.AUTH_LOGOUT,
  }
}

export const CheckAuth=(expirationTime)=>{
  return dispatch =>{
    setTimeout(()=>{
      dispatch(autologout())
    },expirationTime*1000)
  }
}

export const onSingin = (email, password, history) => {
  const authData = {
    email: email,
    password: password,
  };
  return (dispatch) => {
    dispatch(setIsLodaingUser())
    axios
      .post("/auth/login", authData)
      .then((resData) => {
        const token =resData.data.token
        localStorage.setItem("token", token);
        dispatch(setData(token));
       const decoded= decode(resData.data.token)
      const expirationdate=new Date(decoded.exp*1000)
      const expirationTime=decoded.exp-decoded.iat
      dispatch(CheckAuth(expirationTime))
      localStorage.setItem('expirationdate',expirationdate)
      console.log(expirationdate)
        history.push("/Accuiel");
      })
      .catch((error) => {
        dispatch(fetchAuthFailed());
      });
  };
};

export const onSignup = (
  firstname,
  lastname,
  phone,
  image,
  email,
  password,
  point,
  announces
) => {
  const authData = {
    firstname,
    lastname,
    phone,
    image,
    email,
    password,
    point,
    announces,
  };
  return (dispatch) => {
    dispatch(setIsLodaingUser())
    axios
      .post("/user/add", authData)
      .then((resData) => {
        dispatch(setUser(resData.data));
      })
      .catch((error) => {
        dispatch(fetchSignupFailed());
      });
  };
};

export const AuthCheck=()=>{
  return dispatch =>{
    const token=localStorage.getItem('token')
    if(!token){
      dispatch(autologout()) 
    }else {
      const expirationdate=new Date(localStorage.getItem('expirationdate'))
      if(new Date()>=expirationdate){
        dispatch(autologout()) 
      }else{
        const token=localStorage.getItem('token')
        dispatch(setData(token))
        dispatch(CheckAuth((expirationdate.getTime()-new Date().getTime())/1000))
      }
    }
  }
}