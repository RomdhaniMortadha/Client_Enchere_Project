import axios from "axios";
import {apiBaseUrl} from './utils'
export const AddAvis = (avisData) => {
         return axios
       .post(`${apiBaseUrl}avis/add`, avisData)
        .then((resData) => {
             return resData;
          })
       .catch((err) => {
            console.error(err);
            return err
       });
   };
export const GetAllAvis = () => {
     return axios
   .get(`${apiBaseUrl}avis/`)
    .then((resData) => {
         return resData;
      })
   .catch((err) => {
        console.error(err);
        return err
   });
};

export const repondreAvis = (data) => {
     return axios
   .post(`${apiBaseUrl}admin/repondavis`,data)
    .then((resData) => {
         return resData;
      })
   .catch((err) => {
        console.error(err);
        return err
   });
};
export const DeleteAvis = (id) => {
     return axios
   .delete(`${apiBaseUrl}avis/${id}`)
    .then((resData) => {
         return resData;
      })
   .catch((err) => {
        console.error(err);
        return err
   });
};