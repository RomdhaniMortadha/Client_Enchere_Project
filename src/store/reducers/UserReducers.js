import * as actionTypes from "../actions/actionTypes";
import decode from "jwt-decode";
import { updateObject } from "../utility";

const initialState = {
  isauth: false,
  isauthEmpl: false,
  token: "",
  error: false,
  user: {},
  citys: [],
  IslodingConnection: false,
};

const login = (state, action) => {
  const token = action.token;
 
 const  grade=decode(token).grade
if(grade==='user'){
  return updateObject(state, {
    token: token,
    user: decode(token),
    isauth: true,
    IslodingConnection: false,
  });
}else{
  return updateObject(state, {
    token: token,
    admin: decode(token),
    isauthEmpl: true,
    IslodingConnection: false,
  });
}
 
};
const Failed_Auth = (state, action) => {
  localStorage.removeItem("token");
  return updateObject(state, {
    token: "",
    isauth: false,
    isauthEmpl: false,
    error: true,
    IslodingConnection: false,
  });
};

/*const IsLodings = (state, action) => {
  return updateObject(state, {
    IslodingConnection: true,
  });
};*/
const AuthLogout=(state)=>{
  
return updateObject(state,{
  isauth: false,
  isauthEmpl: false,
  token: null,
  user:null,
  IslodingConnection: false,
}
  )
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return login(state, action);
    case actionTypes.AUTH_FAILED:
      return Failed_Auth(state, action);
   /* case actionTypes.ISLOADING:
      return IsLodings(state, action);*/
    case actionTypes.AUTH_LOGOUT:
      return AuthLogout(state,action)
    //case actionTypes.SIGNUP: return onSignup(state , action);
    //case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
    default:
      return state;
  }
};

export default reducer;
