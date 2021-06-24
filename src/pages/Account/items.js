import { SimpleGrid } from "@chakra-ui/react";
import Card from "../../components/card";
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";
import decode from "jwt-decode";
import { useEffect } from "react";

const Items = ({ usr, userAnnounce,ongetUserAnnoncmentHandler }) => {
  useEffect(() => {
    ongetUserAnnoncmentHandler(decode(localStorage.getItem('token')).userId)
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  return (
    <SimpleGrid minChildWidth="300px" spacing="10px">
      {userAnnounce &&
        userAnnounce.map((item) => <Card item={item} key={item._id} />)}
    </SimpleGrid>
  );
};

const mapStateToProps = (state) => {
  return {
    usr: state.users.user,
    userAnnounce: state.annoncement.userAnnounces,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    ongetUserAnnoncmentHandler: (userid) =>
      dispatch(annonceAction.getUserAnnounces(userid)),
    
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(Items);
