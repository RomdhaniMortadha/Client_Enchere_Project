import {
  VStack,
  Input,
  HStack,
  Text,
  Stack,
  Avatar,
  Button,
  FormHelperText,
  FormControl,
  useDisclosure,
  Modal,
  ModalOverlay,
  Image ,
  ModalContent,
  ModalCloseButton,
  useColorMode,
  IconButton
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import validate from "validate.js";
import avatar from "../../assets/images/avatar.png";
import { UpdateAccountSchema } from "../util/schema";
import { updateUser } from "../../services/userServices";
import decode from "jwt-decode";

const Setting = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [form, setform] = useState({
    values: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      image: null,
    },
    isValid: false,
    error: {},
    touched: {},
    isAuth: false,
  });
  useEffect(() => {
    const user = decode(localStorage.getItem("token")) || form.values;
    setform((form) => ({
      ...form,
      values: user,
    }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const errors = validate(form.values, UpdateAccountSchema);
    setform((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      error: errors || {},
    }));
  }, [form.values]);

  const onChangeHandler = (e) => {
    setform((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        [e.target.name]: e.target.value,
      },
      touched: {
        ...prevState.touched,
        [e.target.name]: true,
      },
    }));
  };
  const updateHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("firstname", form.values.firstname);
    formData.append("lastname", form.values.lastname);
    formData.append("phone", form.values.phone);

    if (form.values.localimage) {
      formData.append("image", form.values.image);
    }
    try {
      const { token } = await updateUser(formData);

      setform((prevstate) => ({
        ...prevstate,
        values: decode(token),
        isValid: false,
        error: {},
        touched: {},
      }));
      //setUserHandler(decode(token));
      // setIsSucceed(true);
    } catch (err) {
      throw err;
    }
  };
  const inputs = [
    {
      label: "First name",
      value: form.values.firstname,
      type: "text",
      name: "firstname",
    },
    {
      label: "Last name",
      value: form.values.lastname,
      type: "text",
      name: "lastname",
    },
    {
      label: "E-mail",
      value: form.values.email,
      type: "email",
      name: "email",
    },
    {
      label: "Phone Number",
      value: form.values.phone,
      type: "number",
      name: "phone",
    },
    {
      label: "Points",
      value: form.values.point,
      type: "number",
      name: "point",
    },
  ];

  //hide <input> and ref value to button
  let hiddenInput = null;
  const handleChange = (event) => {
    setform((prevstate) => ({
      ...prevstate,
      values: {
        ...prevstate.values,
        image: event.target.files[0],
        localimage: URL.createObjectURL(event.target.files[0]),
      },
      touched: {
        ...prevstate.touched,
        [event.target.name]: true,
      },
    }));
  };
  const hasError = (field) =>
    form.touched[field] && form.error[field] ? true : false;
  return (
    <FormControl>
      <VStack
        spacing={4}
        align="stretch"
        m={{ base: "1rem 0rem", md: "1rem 6rem" }}
      >
        <Stack
          align="center"
          direction={["column", "row"]}
          spacing={{ base: "1rem", md: "3rem" }}
          m="2rem 3rem"
        >
          <Avatar
            as="button"
            onClick={onOpen}
            size="xl"
            name={form.values.firstname + " " + form.values.lastname}
            src={
              form.values.localimage
                ? form.values.localimage
                : form.values.image
                ? "http://localhost:5000/" + form.values.image
                : avatar
            }
          />
          <HStack>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => hiddenInput.click()}
            >
              Change Profile Picture
            </Button>
            <input
              onChange={(e) => handleChange(e)}
              type="file"
              ref={(el) => (hiddenInput = el)}
              hidden
            />
          </HStack>
          <IconButton
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            onClick={() => toggleColorMode()}
            variant="ghost"
          />
        </Stack>

        {inputs.map((item) => (
          <HStack
            spacing={{ base: "1rem", md: "3rem" }}
            key={item.name + "Hstack"}
          >
            <Text w="10rem" fontSize="md" align="end" key={item.name + "Text"}>
              {item.label}
            </Text>
            <VStack width="100%" key={item.name + "VStack"}>
              <Input
                key={item.name}
                id={item.name}
                isInvalid={hasError(item.name)}
                onChange={(e) => onChangeHandler(e)}
                name={item.name}
                variant="outline"
                value={form.values[item.name]}
                disabled={(item.label === "E-mail" || item.label === "Points" ) ? true : false}
              />
              {hasError(item.name) && (
                <FormHelperText color="red">
                  {form.error[item.name][0]}
                </FormHelperText>
              )}
            </VStack>
          </HStack>
        ))}
        <HStack justify="center">
          <Button
            mt="3rem"
            fontSize={"sm"}
            fontWeight={600}
            color={"white"}
            bg={"pink.400"}
            _hover={{
              bg: "pink.300",
            }}
            disabled={!form.isValid}
            onClick={(e) => updateHandler(e)}
          >
            Save Changes
          </Button>
        </HStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        
        <ModalContent>
        <ModalCloseButton />
          <Image
          src={
              form.values.localimage
                ? form.values.localimage
                : form.values.image
                ? "http://localhost:5000/" + form.values.image
                : avatar
            }
            alt=''/>
            </ModalContent>
        
      </Modal>
    </FormControl>
  );
};
export default Setting;
