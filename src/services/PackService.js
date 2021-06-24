import axios from "../axios-ordres";

export const AllPack = () => {
  return axios
    .get("/packsolde/")
    .then(({ data }) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(err.message);
      console.error(err.message);
    });
};
