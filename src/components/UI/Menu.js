import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Button,
  ListItem,
  UnorderedList,
  useDisclosure,
  CheckCircleIcon,
  OrderedList,
  Text,
  Heading,
  ListIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { regions } from "../../pages/Annoncement/data";

function Menu(props) {
  /*useEffect(()=>{
        CategList()
    },[])
    const CategList = async () => {
        const categories = await getCategorie();
        setListCategHandler(categories);
      };*/

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter By Categorie , country , subject </DrawerHeader>

          <DrawerBody>
            <DrawerBody>
              
              <Input
                placeholder="search with subject..."
                onChange={(e) => props.filterHandler(e.target.value)}
              />
            </DrawerBody>
            <DrawerBody>
            <UnorderedList
                      
                      onClick={() =>
                        props.selectedCateg(null, "all")
                      }
                    >
          <ListItem> Tous les categories</ListItem>
          </UnorderedList>
       
              {props.ListCategories.map((categ, index) => {
                let Result = categ.subcategs.map((subcateg) => {
                  return (
                    <UnorderedList
                      key={subcateg._id}
                      id={subcateg._id}
                      onClick={() =>
                        props.selectedCateg(subcateg._id, "subcateg")
                      }
                    >
                      <UnorderedList>
                        <ListItem>{subcateg.nom}</ListItem>
                      </UnorderedList>
                    </UnorderedList>
                  );
                });
                return (
                  <div key={categ._id}>
                    <ListItem id={categ._id} primary={"✦ " + categ.nom}>
                    <Text as="em">{categ.nom}</Text> 
                    </ListItem>
                    {Result}
                  </div>
                );
              })}
            </DrawerBody>
          </DrawerBody>

          <DrawerBody>
           
            <DrawerBody>
            <UnorderedList
                      
                      onClick={() =>
                        props.selectedCateg(null, "all")
                      }
                    >
          <ListItem> All the Country</ListItem>
          </UnorderedList>
       
              {regions[0].map((region) => {
                 
               
                return (
                  <div key={region._id}>
                    <UnorderedList
                     key={region._id}
                     id={region._id}
                       onClick={() =>
                    props.selectedCateg(region._id, "country")
                 }
               >
                  <ListItem id={region._id} primary={"✦ " + region.nom}>
                    <Text as="em">{region.nom}</Text> 
                    </ListItem>
               </UnorderedList>
                   
                    
                  </div>
                );
              })}
            </DrawerBody>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    annonce: state.annoncement.annonces,
    ListCategories: state.annoncement.listcategorie,
  };
};

export default connect(mapStateToProps)(Menu);
