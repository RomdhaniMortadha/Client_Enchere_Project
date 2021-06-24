import axios from "../axios-ordres";

export const getCategorie = () => {
  return axios
    .get("/categorie/")
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err.message);
      console.error(err.message);
    });
};
