import { SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "../../components/card";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";
import { Spinner, Stack } from "@chakra-ui/react";
import { Button,Center } from "@chakra-ui/react";
import { useHistory } from "react-router";
import openSocket from "socket.io-client";
import Navbar from "../../components/AppBar/AppBar";
import pageNotFound from "./PageNotFound";
import { Portal ,Box} from "@chakra-ui/react"
import Menu from "../../components/UI/Menu"

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(4),
      marginLeft: "30%",
      marginRight: "40%",
    },
  },
}));

const AnnoncmentPage = ({
  ongetAnnoncmentHandler,
  annonce,
  counts,
  ongetUserAnnoncmentHandler,
  usr,
  isloding,
  ongetAllCategories,
  onFiltredAnnoncment,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [isfiltred, setIsFiltred] = useState(false);
  const [isfiltredbycateg, setIsFiltredByCateg] = useState(false);
  const [isfiltredbycountry, setIsFiltredByCountry ] = useState(false);
  const [selectedcountryId,setSelectedcountryId]=useState();
  const [selectedid,setSelectedId]=useState();
  const [text, setText] = useState({ search: "" });
  let history = useHistory();

  useEffect(() => {
    ongetAnnoncmentHandler(page);

    ongetUserAnnoncmentHandler(usr.userId);

    ongetAllCategories();

    const socket = openSocket("http://localhost:5000");
    socket.on("posts", (data) => {
      if (data.action === "create") {
        console.log("socket test");
        ongetAnnoncmentHandler();
      } else if (data.action === "update") {
        ongetAnnoncmentHandler();
      } else if (data.action === "delete") {
        ongetAnnoncmentHandler();
      }else if (data.action==='isUpdated'){
        ongetAnnoncmentHandler();
      }
      
    });
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const pagesNumber = counts;
  /*const selectedCateg = async (id, type) => {

    if (type === "subcateg") {
      onFiltredAnnoncment(id)
     
    } else if (type === "all") {
     // setAnnouncements(announcementscontexte);
    }

  };*/
  const FilterChangeHandler = async (value) => {
    if (value.trim().length > 0) 
    setIsFiltred(true);
    else 
    setIsFiltred(false);

    setText({ search: value });
  };

  const selectedCateg=(id,type)=>{
    
     // setIsLoading(true);
      if (type === "subcateg") {
        setIsFiltredByCateg(true)
        setIsFiltredByCountry(false)
        setSelectedId(id)
        const rst=  annonce.filter((annonc) => {
          if (annonc.subcategorie === id) {
            console.log(annonc)
            return annonc;
          }
          })
          console.log(annonce)
          console.log(rst)
        }
    
        
      else if (type === "all") {
        setIsFiltredByCateg(false)
        setIsFiltredByCountry(false)
      }
     else if (type==="country"){
      setIsFiltredByCateg(false)
    setIsFiltredByCountry(true)
    setSelectedcountryId(id)
    const rst=annonce.filter((annonce) => {
      if (annonce.city === selectedcountryId) {
        return annonce;
      }
    })
    console.log(rst)
     }
    };
  
  console.log(isfiltredbycountry+" "+selectedcountryId)
  const regex = new RegExp(text.search, "i");
  return (
    <div className={classes.root}>
    
      {isloding ? (
        <Stack direction="row" spacing={4}>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            m="auto"
          />
        </Stack>
      ) : (
        <SimpleGrid minChildWidth="300px" spacing="10px" px={{base:"1rem",md:"12rem"}} pt="3rem">
          {
          isfiltred ? (
             annonce
              .filter((annonces) => {
                if (regex.test(annonces.subject)) {
                  return annonces;
                } else {
                  return null;
                }
              })
              .map((item) => {
                if(item.length<1){
                  return ((<Box bg="red.400" color="white">
                  I'm here,
                  <Portal>This text is portaled at the end of document.body!</Portal>
                </Box>) ) 
                }
                else{
                  return <Card item={item} key={item._id} />
                
                }
              }))
              :isfiltredbycateg?(
                annonce.filter((annonc) => {
                  if (annonc.subcategorie === selectedid) {
                    console.log(annonc)
                    return annonc;
                  }
                })
                .map((item)=>  {if(item){
                  return <Card item={item} key={item._id} />
                   }
                   else{
   
                   return (<Box bg="red.400" color="white">
                   I'm here,
                   <Portal>This text is portaled at the end of document.body!</Portal>
                 </Box>) 
                   }
                   }))
              :isfiltredbycountry ?(
              annonce.filter((annonce) => {
                if (annonce.city === selectedcountryId) {
                  return annonce;
                }
              })
              .map((item)=><Card item={item} key={item._id}/>))
          :
          annonce &&
            annonce.map((item) => <Card item={item} key={item._id} />)}
        </SimpleGrid>
      )}
      <Center>
      <Pagination
        count={pagesNumber}
        page={page}
        onChange={(_, value) => setPage(value)}
      />
      </Center>
      <Menu selectedCateg={selectedCateg}
       filterHandler={FilterChangeHandler}/>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    annonce: state.annoncement.annonces,
    counts: state.annoncement.count,
    usr: state.users.user,
    isloding: state.annoncement.isLoding,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFiltredAnnoncment:(id)=>dispatch({type:"FILTRED",id}),
    ongetAnnoncmentHandler: (page) =>
      dispatch(annonceAction.ongetAllAnnonce(page)),
    ongetUserAnnoncmentHandler: (userid) =>
      dispatch(annonceAction.getUserAnnounces(userid)),
    ongetAllCategories: () => dispatch(annonceAction.getAllCategorie()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AnnoncmentPage);
