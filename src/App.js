import Route from "./Routes";
import Footer from "./components/Footer/Footer";
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/AppBar/AppBar";
import { connect } from "react-redux";
import { useEffect } from "react";
import * as action from "./store/actions/index";
import { useHistory } from "react-router";
function App({auth,isauthempl,authCheckHandler}) {
  let history=useHistory();
 useEffect(()=>{
  authCheckHandler()
 
 },[])
 /*useEffect(()=>{
  if(!auth){
    history.push('/signin')
  }
 },[auth])*/
  return (
    <ChakraProvider>
    <Navbar/>
    <Route isAuth={auth} isAuthempl={isauthempl}/>
    <Footer/>
    </ChakraProvider>
  );
}
const mapStateToProps=(state)=>{
  return {
    auth:state.users.isauth,
    isauthempl:state.users.isauthempl
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    authCheckHandler:()=>dispatch(action.AuthCheck()),
   
  };
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
