import {useState ,useRef} from "react";
import {
    useDisclosure,
    React,
    Button,
    Drawer,
  Tr,
  DrawerOverlay,
  Text,
  Td,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  IconButton,
  Textarea,
  FormLabel,
  Stack,
  Box
} from "@chakra-ui/react";
import { DeleteAvis,repondreAvis } from "../../services/avisService";

import { ViewIcon,DeleteIcon } from '@chakra-ui/icons'
//import { GetAllAvis } from "../../services/avisService";
const AvisCard = ({ avis }) => {
const [isSucceed, setIsSucceed] = useState(false);
const { isOpen, onOpen, onClose } = useDisclosure();
const [isLoading, setisLoading] = useState(false);

  const btnRef = useRef();
  const [formState, setFormState] = useState({
    values: {
      email: avis.email,
      message: "",
    }
  });
  const inputChangeHandler = (e) => {
    e.persist();

    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      }
    }));
  };
  const respondHandler=async(e)=>{
    e.preventDefault();
    setisLoading(true);
    const result=await repondreAvis(formState.values);
    if(result.status===200){
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          message:"",
        }
      }));
      await deleteAvisHandler()
    }
    console.log(result)
    setisLoading(false);
    setIsSucceed(true)
    onClose()
  }
const deleteAvisHandler = async () => {
  if (window.confirm("Vous voulez supprimer ce message ?")) {
    setisLoading(true);
    await DeleteAvis(avis._id);
    setisLoading(false);
    setIsSucceed(true)
  }}

  return (
    <Tr display={isSucceed && 'none'}>
      <Td maxW="300px">
        <Text isTruncated>{avis.email}</Text>
      </Td>
      <Td maxW="300px">
        <Text isTruncated>{avis.detail}</Text>
      </Td>
      <Td>
        <Text isTruncated>{avis.createdAt}</Text>
      </Td>
      <Td>
        {" "}
        <IconButton icon={<ViewIcon />} ref={btnRef} bg="transparent" onClick={onOpen}/>
        <IconButton icon={<DeleteIcon />}  bg="transparent" onClick={deleteAvisHandler} />
      </Td>
      <Drawer
      size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Message</DrawerHeader>

          <DrawerBody>
          <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="username">Email</FormLabel>
                <Input
                isReadOnly
                  id="email"
                  value={avis.email}
                />
              </Box>
              <Box>
                <FormLabel htmlFor="username">Detail</FormLabel>
                <Textarea
                isReadOnly
                  id="detail"
                  rows="6"
                  value={avis.detail}
                />
              </Box>
              <Box>
              <FormLabel htmlFor="username">Your Response :</FormLabel>
                <Textarea
                rows="6"
                  value={formState.values.message}
                  onChange={inputChangeHandler}
                  id="message"
                  name="message"
                />
              </Box>
            </Stack>

          </DrawerBody>

          <DrawerFooter>
            <Button  variant="outline" mr={3} onClick={onClose}>
            close
            </Button>

            <Button colorScheme="blue" onClick={respondHandler}>Send Response</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Tr>
  );
};

export default AvisCard;