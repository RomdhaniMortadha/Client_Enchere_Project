import React, { useState, useEffect } from "react";
import { signUpSchema } from "../util/schema";
import validate from "validate.js";
import { signupHandler } from "../../services/AuthService";
import { useHistory } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  Button,
  CSSReset,
  Heading,
  InputGroup,
  Icon,
  Link,
  ThemeProvider,
  theme,
  FormControl,
  FormLabel,
  Input,
  InputLeftAddon,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";

const TrySignup = () => {
  const [SignupFailedState, setSignupFailed] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formState, setFormState] = useState({
    values: {
      firstname: "",
      lastname: "",
      phone: "",

      email: "",
      password: "",
      confirmpassword: "",
    },
    isValid: false,
    error: {},
    touched: {},
    isAuth: false,
  });

  useEffect(() => {
    const errors = validate(formState.values, signUpSchema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      error: errors || {},
    }));
  }, [formState.values]);

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
  let history = useHistory();
  const onSignupHandler = async (e) => {
    e.preventDefault();
    const {
      firstname,
      lastname,
      phone,

      email,
      password,
    } = formState.values;
    const signupData = {
      firstname,
      lastname,
      phone,
      email,
      password,
    };
    setisLoading(true);

    const response = await signupHandler(signupData);
    if (response) {
      history.push("/signin");
    } else {
      setSignupFailed(true);
    }
    setisLoading(false);
  };
  const isValidPassword = () => {
    return formState.touched["confirmpassword"]
      ? formState.values.password === formState.values.confirmpassword
        ? true
        : false
      : true;
  };

  const hasError = (field) =>
    formState.touched[field] && formState.error[field] ? true : false;

  let fieldsArray = [];
  for (let key in formState.values) {
    fieldsArray.push({
      id: key,
      value: formState.values[key],
      name: key,
    });
  }
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const toasts = () => {
    toast({
      title: "failed",
      description: "Failed to create account.",
      status: "error",
      duration: 9000,
      isClosable: true,
    });
  };
  if (SignupFailedState) toasts();
  return (
    <ThemeProvider theme={theme} key="themeprovider">
      <CSSReset key="CSSReset" />
      <Box w={600} p={4} m="20px auto" key="fatherbox">
        <Heading as="h1" size="xl" textAlign="center" key="headingkey">
          Create Your Account
        </Heading>
        <Heading as="h2" size="l" textAlign="center" m={5} key="hedadinsecond">
          Enchére Tunise
        </Heading>
        <Box as="p" textAlign="center" key="secondbox">
          Example using React Final Form and{" "}
          <Link href="https://chakra-ui.com" isExternal key="linkkey">
            Chakra <Icon name="external-link" mx="2px" />
          </Link>
        </Box>
        <Box as="p" textAlign="center" key="boxread">
          <Link href="https://final-form.org/react" isExternal key="secondkey">
            Read Docs <Icon name="view" mx="2px" />
          </Link>
        </Box>
        <form onSubmit={(e) => onSignupHandler(e)}>
          {fieldsArray.map(({ name, value }) => (
            <Box p={5} shadow="md" borderWidth="2px" key={name}>
              <HStack spacing={{ base: "1rem", md: "2rem" }} width="100%">
                <FormLabel spacing={{ base: "1rem", md: "2rem" }}>
                  {name}
                </FormLabel>
                {name === "phone" ? (
                  <InputGroup width="65%">
                    <InputLeftAddon children="+216" />
                    <Input
                      type="tel"
                      placeholder="phone number"
                      isInvalid={hasError(name)}
                      name={name}
                      onChange={inputChangeHandler}
                      value={value}
                    />
                  </InputGroup>
                ) : name === "password" || name === "confirmpassword" ? (
                  <InputGroup size="md" width="70%">
                    <Input
                      variant="filled"
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder={`Enter your ${name} `}
                      isInvalid={hasError(name)}
                      name={name}
                      onChange={inputChangeHandler}
                      value={value}
                    />
                    <InputRightElement width="22%">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                ) : (
                  <FormControl>
                    <VStack width="80%">
                      <Input
                        variant="filled"
                        type={name}
                        placeholder={`Enter your ${name}`}
                        isInvalid={hasError(name)}
                        name={name}
                        onChange={inputChangeHandler}
                        value={value}
                      />
                      {hasError(name) && (
                        <FormHelperText color="red" key="formhelper">
                          {formState.error[name]}
                        </FormHelperText>
                      )}
                    </VStack>
                  </FormControl>
                )}
              </HStack>
            </Box>
          ))}
          <Box as="p" textAlign="center" key="btnBoxhandler">
            <Button
              size="md"
              m={5}
              height="48px"
              width="50%"
              border="2px"
              type="submit"
              isLoading={isLoading}
              onClick={onSignupHandler}
              borderColor="green.500"
              disabled={!formState.isValid || !isValidPassword()}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </ThemeProvider>
  );
};
export default TrySignup;
