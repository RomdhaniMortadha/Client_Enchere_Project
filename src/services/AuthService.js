
import axios from '../axios-ordres';
export const signupHandler = (authData) => {
    return axios
      .post("/user/add", authData)
      .then((resData) => {
        
        return resData.data;
      })
      .catch((err) => {
        console.error(err.message);
      });
  };
  