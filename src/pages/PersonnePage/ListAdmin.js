import List from "../../components/UI/List";
import React, { useState, useEffect } from "react";
import { getAllAdmin,DelteAdmin } from "../../services/AdminService";

const ListUser = (props) => {
  const [listAdmin, setlistAdmin] = useState([]);

  useEffect(() => {
    getAdmins();
   
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

const delteAdmin=async(id)=>{
 const admindelte= await DelteAdmin(id)
 if(admindelte){
  setlistAdmin(listAdmin.filter(admin=>admin.id!==id && admin) )
 }
}

  const getAdmins = async () => {
    const admins = await getAllAdmin();
    const result = admins.map(
      ({ _id, firstname, lastname, email, phone, point }) => {
        return {
          id: _id,
          firstName: firstname,
          lastName: lastname,
          email: email,
          phone: phone,
          point: point,
        };
      }
    );
    setlistAdmin(result);
  };
  console.log(listAdmin);
  return (
  <List list={listAdmin}
  delte={delteAdmin}
  ></List>
  );
};

export default ListUser;
