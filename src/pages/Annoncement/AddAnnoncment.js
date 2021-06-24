import React, { useState, useEffect } from "react";
import ImageUploader from "react-images-upload";
import { AddAnnouncementSchema } from "../util/schema";
import {
  onAddNormalAnnonce,
  onAddEnchereAnnonce,
  onAddDrawAnnonce,
} from "../../services/AnnonceService";
import decode from "jwt-decode";
import validate from "validate.js";
import { regions } from "./data";
import { connect } from "react-redux";
import * as annonceAction from "../../store/actions/index";

import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  RadioGroup,
  Radio,
  Select,
  Textarea,
  StackDivider,
  ThemeProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  FormHelperText,
  VStack,
} from "@chakra-ui/react";
import { CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddAnnoucement = ({ Listcategories, ongetAllCategories }) => {
  const [startDate, setStartDate] = useState(new Date());
  console.log(startDate);
  const [isLoading, setisLoading] = useState(false);
  const [value, setValue] = useState("Normal");
  const [maxparticipants, setMaxparticiPants] = useState("");
  const [formState, setFormState] = useState({
    values: {
      objet: "",
      detail: "",
      end_Date: "",
      initial_price: "",
      participation_price: "",
      city: {
        nom: "",
        id: "",
      },
      phone: "",
      price: "",
      subcategorie: {
        id: "",
        nom: "",
      },
      image: null,
      type: "",
    },
    isValid: false,
    errors: {},
    touched: {},
  });

  useEffect(() => {
    ongetAllCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const errors = validate(formState.values, AddAnnouncementSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const onDrop = (picture) => {
    setFormState((prevState) => ({
      ...prevState,
      values: {
        ...prevState.values,
        image: picture,
      },
    }));
  };

  const token = localStorage.getItem("token");
  const user = decode(token);

  let history = useHistory();

  const submitFormHandler = async (e) => {
    e.preventDefault();

    e.preventDefault();
    setisLoading(true);
    const subcategId = formState.values.subcategorie.id;
    const form = new FormData();

    form.append("subject", formState.values.objet);
    form.append("details", formState.values.detail);
    form.append("city", formState.values.city);
    form.append("phone", formState.values.phone);
    //form.append("price", formState.values.price);
    if (formState.values.image) {
      form.append("image", formState.values.image[0]);
    }
    if (value === "Normal") {
      form.append("price", formState.values.price);
      await onAddNormalAnnonce(
        user.userId,
        subcategId,
        formState.values.city.id,
        form
      );
      setisLoading(false);
    } else if (value === "Enchére") {
      form.append("initial_price", formState.values.initial_price);
      form.append("end_Date", startDate);
      await onAddEnchereAnnonce(
        user.userId,
        subcategId,
        formState.values.city.id,
        form
      );
      setisLoading(false);
    } else {
      form.append("max_participants_number", maxparticipants);
      form.append("participation_price", formState.values.participation_price);
      await onAddDrawAnnonce(
        user.userId,
        subcategId,
        formState.values.city.id,
        form
      );
      setisLoading(false);
    }
    history.push("/Accuiel");
  };

  const inputChangeHandler = (e) => {
    e.persist();

    if (e.target.name === "subcategorie") {
      const id = e.target.value.slice(
        e.target.value.indexOf("$") + 1,
        e.target.value.length
      );
      const name = e.target.value.slice(0, e.target.value.indexOf("$"));
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [e.target.name]: {
            id: id,
            nom: name,
          },
        },
        touched: {
          ...formState.touched,
          [e.target.name]: true,
        },
      }));
    } else if (e.target.name === "city") {
      const id = e.target.value.slice(
        e.target.value.indexOf("$") + 1,
        e.target.value.length
      );
      const name = e.target.value.slice(0, e.target.value.indexOf("$"));
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [e.target.name]: {
            id: id,
            nom: name,
          },
        },
        touched: {
          ...formState.touched,
          [e.target.name]: true,
        },
      }));
    } else {
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          [e.target.name]: e.target.value,
        },
        touched: {
          ...formState.touched,
          [e.target.name]: true,
        },
      }));
    }
  };
  const hasError = (field) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex
        minHeight="100vh"
        width="full"
        align="center"
        justifyContent="center"
      >
        <Box
          borderWidth={3}
          px={8}
          width="full"
          maxWidth="800px"
          borderRadius={4}
          textAlign="center"
          boxShadow="lg"
          spacing={2}
          h="100%"
        >
          <form onSubmit={(e) => submitFormHandler(e)}>
            <VStack
              divider={<StackDivider borderColor="gray.200" />}
              align="stretch"
            >
              <FormControl>
                <VStack width="100%">
                  <FormLabel color={`teal.500`}>Titre</FormLabel>
                  <Input
                    variant="filled"
                    placeholder="Titre"
                    name="objet"
                    isInvalid={hasError("objet")}
                    onChange={inputChangeHandler}
                    value={formState.values.objet}
                  />
                  {hasError("objet") && (
                    <FormHelperText color="red">
                      {formState.errors.objet[0]}
                    </FormHelperText>
                  )}
                </VStack>
              </FormControl>

              <FormControl>
                <VStack width="100%" textAlign="left">
                  <FormLabel color={`teal.500`}>Détail</FormLabel>
                  <Textarea
                    placeholder="Here is a sample placeholder"
                    size="sm"
                    variant="filled"
                    name="detail"
                    value={formState.values.detail}
                    onChange={inputChangeHandler}
                  />
                </VStack>
              </FormControl>
              <VStack width="100%" textAlign="left">
                <FormLabel color={`teal.500`}>
                  <Text color="teal.500">Phone_Number</Text>
                </FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<PhoneIcon color="teal.500" />}
                  />
                  <Input
                    name="phone"
                    isInvalid={hasError("phone")}
                    onChange={inputChangeHandler}
                    value={formState.values.phone}
                    placeholder="Phone number"
                    variant="filled"
                  />
                  {hasError("phone") && (
                    <FormHelperText color="red">
                      {formState.errors.phone[0]}
                    </FormHelperText>
                  )}
                </InputGroup>
              </VStack>
              <FormLabel color={`teal.500`}>
                <Text color="teal.500">Type_Annonce</Text>
              </FormLabel>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row">
                  <Radio value="Normal">Normal</Radio>
                  <Radio value="Draw">Draw</Radio>
                  <Radio value="Enchére">Enchére</Radio>
                </Stack>
              </RadioGroup>
              {value === "Normal" ? (
                <VStack width="100%" textAlign="left">
                  <FormLabel color={`teal.500`}>
                    <Text color="teal.500">Amount</Text>
                  </FormLabel>

                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="teal.500"
                      fontSize="1.2em"
                      children="DT"
                    />
                    <Input
                      placeholder="Enter amount"
                      variant="filled"
                      name="price"
                      isInvalid={hasError("price")}
                      onChange={inputChangeHandler}
                      value={formState.values.price}
                    />
                    {hasError("price") && (
                      <FormHelperText color="red">
                        {formState.errors.price[0]}
                      </FormHelperText>
                    )}

                    <InputRightElement
                      children={<CheckIcon color="teal.500" />}
                    />
                  </InputGroup>
                </VStack>
              ) : value === "Enchére" ? (
                <div>
                  <FormControl>
                    <VStack width="100%">
                      <FormLabel color={`teal.500`}>
                        Enter date_fin Enchére
                      </FormLabel>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                        isClearable
                      />
                    </VStack>
                  </FormControl>

                  <VStack width="100%" textAlign="left">
                    <FormLabel color={`teal.500`}>
                      <Text color="teal.500">initial_price</Text>
                    </FormLabel>

                    <InputGroup>
                      <InputLeftElement
                        pointerEvents="none"
                        color="teal.500"
                        fontSize="1.2em"
                        children="DT"
                      />
                      <Input
                        placeholder="Enter amount"
                        variant="filled"
                        name="initial_price"
                        onChange={inputChangeHandler}
                        value={formState.values.initial_price}
                      />
                      {hasError("price") && (
                        <FormHelperText color="red">
                          {formState.errors.price[0]}
                        </FormHelperText>
                      )}

                      <InputRightElement
                        children={<CheckIcon color="teal.500" />}
                      />
                    </InputGroup>
                  </VStack>
                </div>
              ) : (
                value === "Draw" && (
                  <FormControl>
                    <VStack width="100%">
                      <FormLabel color={`teal.500`}>
                        max_participants_number
                      </FormLabel>
                      <NumberInput
                        min={5}
                        max={5000}
                        placeholder="Number_participant"
                        name="max_participants_number"
                        onChange={setMaxparticiPants}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper
                            value={formState.values.max_participants_number}
                          />
                          <NumberDecrementStepper
                            value={formState.values.max_participants_number}
                          />
                        </NumberInputStepper>
                      </NumberInput>
                    </VStack>
                    <VStack width="100%" textAlign="left">
                      <FormLabel color={`teal.500`}>
                        <Text color="teal.500">initial_price</Text>
                      </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="teal.500"
                          fontSize="1.2em"
                          children="DT"
                        />
                        <Input
                          placeholder="Participation_Price"
                          variant="filled"
                          name="participation_price"
                          onChange={inputChangeHandler}
                          value={formState.values.participation_price}
                        />

                        <InputRightElement
                          children={<CheckIcon color="teal.500" />}
                        />
                      </InputGroup>
                    </VStack>
                  </FormControl>
                )
              )}
              <FormControl id="country">
                <VStack width="100%" textAlign="left">
                  <FormLabel color="teal.500">Country</FormLabel>
                  <Select
                    placeholder="Select country"
                    variant="filled"
                    onChange={inputChangeHandler}
                    name="city"
                  >
                    {regions[0].map((region) => (
                      <option
                        value={region.nom + "$" + region._id}
                        key={region.nom}
                      >
                        {region.nom}
                      </option>
                    ))}
                  </Select>
                </VStack>
              </FormControl>

              <FormControl id="country">
                <VStack width="100%" textAlign="left">
                  <FormLabel color="teal.500">Categorie</FormLabel>
                  <Select
                    placeholder=" "
                    variant="filled"
                    onChange={inputChangeHandler}
                    name="subcategorie"
                  >
                    {Listcategories.map((categ) => {
                      let Result = categ.subcategs.map((subcateg) => {
                        return (
                          <option
                            key={subcateg}
                            value={subcateg.nom + "$" + subcateg._id}
                          >
                            {subcateg.nom}
                          </option>
                        );
                      });
                      return (
                        <optgroup key={categ.nom} label={categ.nom}>
                          {Result}
                        </optgroup>
                      );
                    })}
                  </Select>
                </VStack>
              </FormControl>

              <ImageUploader
                backgroundColor="#0000"
                singleImage={true}
                key="img"
                type={File}
                withPreview={true}
                withIcon={true}
                label="Taille maximale du fichier: 5 Mo, acceptée: jpg"
                buttonText="Choose images"
                onChange={onDrop}
                fileSizeError="la taille du fichier est trop grande"
                fileTypeError="extension de fichier n'est pas prise en charge"
                imgExtension={[".jpg", ".gif", ".png", ".gif", "jpeg"]}
                maxFileSize={5242880}
              />
            </VStack>
            <br />

            <Button
              colorScheme="teal"
              type="submit"
              variant="outline"
              width="full"
              mt={4}
              isLoading={isLoading}
            >
              Publish
            </Button>
          </form>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    // auth:state.isauth,
    usr: state.users.user,
    err: state.users.error,
    Listcategories: state.annoncement.listcategorie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ongetAllCategories: () => dispatch(annonceAction.getAllCategorie()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAnnoucement);
