import {
  ThemeProvider,
  theme,
  CSSReset,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Heading,
  Text,
  Link,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Checkbox,
  Button,
  FormHelperText,
  VStack,
} from "@chakra-ui/react";
//import {CheckIcon,PhoneIcon} from "@chakra-ui/icons";
import "./Auth.css";

import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import * as authAction from "../../store/actions/index";
import { connect } from "react-redux";
import { signInSchema } from "../util/schema";
import validate from "validate.js";

const LoginForm = ({ onLoginHandler, history, err, IsLoding }) => {
  const VARIANT_COLOR = "teal";

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [formState, setFormState] = useState({
    values: {
      email: "",
      password: "",
    },
    isValid: false,
    errors: {},
    touched: {},
  });
  useEffect(() => {
    const errors = validate(formState.values, signInSchema);
    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const inputChangeHandler = (e) => {
    //setSignupFailed(false);
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

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

  const submitFormHandler = async (e) => {
    e.preventDefault();
    onLoginHandler(formState.values.email, formState.values.password, history);
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
          borderWidth={4}
          px={4}
          width="full"
          maxWidth="500px"
          borderRadius={2}
          textAlign="center"
          boxShadow="lg"
        >
          <Box p={4}>
            <Box textAlign="center">
              <Heading>Sign In to Your Account</Heading>
              <Text>
                <Link color={`${VARIANT_COLOR}.500`}>Enchére Tunise</Link>
              </Text>
            </Box>
            <Box my={8} textAlign="left">
              <form onSubmit={(e) => submitFormHandler(e)}>
                <FormControl>
                  <FormLabel>Email address</FormLabel>
                  <VStack width="100%">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      isInvalid={hasError("email")}
                      name="email"
                      variant="outline"
                      onChange={inputChangeHandler}
                      value={formState.values.email}
                    />
                    {hasError("email") && (
                      <FormHelperText color="red">
                        {formState.errors.email[0]}
                      </FormHelperText>
                    )}
                  </VStack>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel> Password</FormLabel>
                  <InputGroup size="md">
                    <VStack width="100%">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        isInvalid={hasError("password")}
                        name="password"
                        variant="outline"
                        onChange={inputChangeHandler}
                        value={formState.values.password}
                      />
                      {hasError("password") && (
                        <FormHelperText color="red">
                          {formState.errors.password[0]}
                        </FormHelperText>
                      )}
                    </VStack>
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack isInline justifyContent="space-between" mt={4}>
                  <Box>
                    <Checkbox>Remember Me</Checkbox>
                  </Box>
                  <Box>
                    <Link color={`${VARIANT_COLOR}.500`}>
                      Forgot your password?
                    </Link>
                  </Box>
                </Stack>
                <Button
                 isLoading={IsLoding}
                  colorScheme="teal"
                  type="submit"
                  variant="solid"
                  width="full"
                  mt={4}
                 
                >
                  Sign In
                </Button>
              </form>
            </Box>
          </Box>
        </Box>
      </Flex>
    </ThemeProvider>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.users.isauth,
    err: state.users.error,
    linto: state.users.link,
    IsLoding: state.users.IslodingConnection,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onLoginHandler: (email, password, history) =>
      dispatch(authAction.onSingin(email, password, history)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginForm));
