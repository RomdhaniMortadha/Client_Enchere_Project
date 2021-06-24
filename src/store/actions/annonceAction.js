import * as actionTypes from "./actionTypes";
import axios from "../../axios-ordres";

export const setAnnonce = (annonce, count) => {
  return {
    type: actionTypes.ANNONCEMENT,
    Annoncment_data: annonce,
    count,
  };
};
export const fetchDataFailed = () => {
  return {
    type: actionTypes.FETCH_DATA_FAILED,
  };
};
export const setUserAnnonce = (userAnnounces) => {
  return {
    type: actionTypes.USER_ANNONCES,
    userAnnounces,
  };
};

export const setIsLodaings = () => {
  return {
    type: actionTypes.ISLOADING,
  };
};
export const setCategorie = (categ) => {
  return {
    type: actionTypes.FETCH_CATEGORIE,
    categ,
  };
};

export const ongetAllAnnonce = (page) => {
  return (dispatch) => {
    dispatch(setIsLodaings());
    axios
      .get(`/announce/?page=${page}`)
      .then(({ data }) => {
        const { announces, announcesCount } = data;
        return dispatch(setAnnonce(announces, announcesCount));
      })
      .catch((err) => {
        dispatch(fetchDataFailed());
      });
  };
};

export const getUserAnnounces = (userid) => {
  return (dispatch) => {
    axios
      .get(`/announce/user/${userid}`)
      .then(({ data }) => {
        return dispatch(setUserAnnonce(data));
      })
      .catch((err) => {
        dispatch(fetchDataFailed());
      });
  };
};

export const getAllCategorie = () => {
  return (dispatch) => {
    axios
      .get(`/categorie/`)
      .then(({ data }) => {
        return dispatch(setCategorie(data));
      })
      .catch((err) => {
        dispatch(fetchDataFailed());
      });
  };
};
