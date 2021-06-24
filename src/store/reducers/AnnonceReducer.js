import * as actionTypes from "../actions/actionTypes";
//import { setIsLodaings } from "../actions/annonceAction";
import { updateObject } from "../utility";

const initialState = {
    annonces: [],
    count:null,
    error:false,
    userAnnounces:[],
    isLoding:false,
    listcategorie:[],
  filter:"",
  };

  const UserAnnouncment=(state,action)=>{
    return updateObject(state,{
      userAnnounces:action.userAnnounces.reverse()
    })
  }

  const Annoncment=(state, action) => {
return updateObject(state,{
  annonces:action.Annoncment_data,
  count:action.count,
  isLoding:false
})
  }
 const fetchDataFailed=(state,action)=>{
   return updateObject(state,{
     error:true,
     isLoding:false
   })
 }
 const IsLodings=(state,action)=>{
   return updateObject(state,{
     isLoding:true
   })
 }
const getAllCategorie=(state,action)=>{
  return updateObject(state,{
    listcategorie:action.categ
  })
};

const filtercateg=(state,action)=>{
  const result = state.annonces.filter((annonc) => {
    if (annonc.subcategorie === action.id) {
      console.log(annonc)
      return annonc;
    }
  });
console.log(result)
  return updateObject(state,{
   annonces:result,
   filter:action.id
  })
}


const AnnonceReducer = (state = initialState, action) => {
    
  switch (action.type) {
    case actionTypes.FILTRED: return filtercateg(state, action);
      case actionTypes.ANNONCEMENT: return Annoncment(state, action);
      case actionTypes.FETCH_DATA_FAILED: return fetchDataFailed(state, action);
      case actionTypes.USER_ANNONCES:return UserAnnouncment(state,action);
      case actionTypes.ISLOADING:return IsLodings(state,action);
      case actionTypes.FETCH_CATEGORIE:return getAllCategorie(state,action);
      default: return state;
    
  };
}

export default AnnonceReducer;