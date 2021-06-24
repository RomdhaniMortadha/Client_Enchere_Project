import axios from '../axios-ordres';

export const AllCitys = (authData) => {
    return axios
      .get("/city/", authData)
      .then((resData) => {
        return resData.data;
      })
      .catch((err) => {
       console.error(err.message);
      });
};
export const getCity = (id) => {
  return axios
    .get("/city/"+id)
    .then((resData) => {
      return resData.data;
    })
    .catch((err) => {
     console.error(err.message);
    });
};
  