import List from "../../components/UI/List";
import React, { useState, useEffect } from "react";
import { getAllUser,DelteUser } from "../../services/userServices";

const ListUser = (props) => {
  const [listuser, setListUser] = useState([]);

  useEffect(() => {
    getusers();
   
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

const delteuser=async(id)=>{
 const userdelte= await DelteUser(id)
 if(userdelte){
  
  const users=listuser.filter(user=>user.id!==id&& user
  )
  setListUser(users)
 }
}

  const getusers = async () => {
    const users = await getAllUser();
    console.log(users);
    const result = users.Users.map(
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
    setListUser(result);
  };
  console.log(listuser);
  return (
  <List list={listuser}
  delte={delteuser}
  ></List>
  );
};

export default ListUser;
