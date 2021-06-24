import axios from "../axios-ordres";

export const onAddNormalAnnonce = (userid, subcateg_id, cityId, authData) => {
  return axios
    .post(`/normalAnnounce/add/${userid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err.message);
    });
};
export const onEnchereParticipation = (id, data) => {
  return axios
    .post(`/enchere/participate/${id}`, data)
    .then((resData) => {
      localStorage.removeItem("token");
      localStorage.setItem("token", resData.data.token);
      return resData.data.enchere;
    })
    .catch((err) => {
      console.error(err.message);
    });
};

export const onAddDrawAnnonce = (usrid, subcateg_id, cityId, authData) => {
  return axios
    .post(`draw/add/${usrid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const onAddEnchereAnnonce = (userid, subcateg_id, cityId, authData) => {
  return axios
    .post(`enchere/add/${userid}/${subcateg_id}/${cityId}`, authData)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getUserAnnounces = (id) => {
  return axios
    .get(`/announce/user/${id}`)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const getAllAnnonce = (page) => {
  return axios
    .get(`/announce/?page=${page}`)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const getAnnounce = (id) => {
  return axios
    .get(`/announce/${id}`)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};
export const deleteAnnounce = (id) => {
  const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
  return axios
    .delete(`/announce/${id}`)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
      console.error(err);
    });
};