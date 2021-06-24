import { useEffect, useState } from "react";
import validate from "validate.js";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Grid,
  Image,
  GridItem,
  Box,
  FormHelperText,
} from "@chakra-ui/react";
import contactus from "../../assets/images/contactus.png";
import { ContactUsSchema } from "../util/schema";
import { AddAvis } from "../../services/avisService";

const ContactUs = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      email: "",
      detail: "",
    },
    isValid: false,
    touched: {},
    errors: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, ContactUsSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);
  const submitFormHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { email, detail } = formState.values;
    const response = await AddAvis({ email, detail });
    if (response) {
      console.log(response);
      if (response.status === 200) {
        setIsSucceed(true);
      }
    }
    setFormState((formState) => ({
      values: {
        email: "",
        detail: "",
      },
      isValid: false,
      touched: {},
      errors: {},
    }));
    setIsLoading(false);
  };
  const inputChangeHandler = (e) => {
    e.persist();
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
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSucceed(false);
  };
  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  return (
    <Box
      p="1rem"
      m={{ base: "1rem", md: "6rem" }}
      border="1px"
      borderRadius="xl"
    >
      <Grid templateColumns={["repeat(2, 1fr)", "repeat(6, 1fr)"]} gap={4}>
        <GridItem colSpan={2}  >
          <Image src={contactus} alt="contact us"   />
        </GridItem>
        <GridItem colSpan={4} mt="auto">
          <form onSubmit={(e) => submitFormHandler(e)}>
            <FormControl id="E-mail" isRequired mb="15px">
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={inputChangeHandler}
                value={formState.values.email}
              />
              {hasError("email") && (
                <FormHelperText color="red">
                  {hasError("email") ? formState.errors.email[0] : null}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="E-mail" isRequired>
              <FormLabel>Details</FormLabel>
              <Textarea
                placeholder="Enter you text here"
                value={formState.values.detail}
                onChange={inputChangeHandler}
                id="detail"
                name="detail"
              />
              {hasError("detail") && (
                <FormHelperText  color="red">
                  {hasError("detail") ? formState.errors.detail[0] : null}
                </FormHelperText>
              )}
            </FormControl>
            <Button
            float="right"
            width="4x1"
              colorScheme="teal"
              variant="solid"
              disabled={isLoading || !formState.isValid}
              type="submit"
            >
              Sent  Message
            </Button>
          </form>
          <Snackbar
            open={isSucceed}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success">
              Success !
            </Alert>
          </Snackbar>
        </GridItem>
      </Grid>
    </Box>
  );
};
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default ContactUs;