import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  useToast,
} from "@chakra-ui/react";
// import "./Login.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);
  const [error, setError] = useState(null);
  const toast = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://fair-blue-cod-cape.cyclic.app/api/auth/login",

        { username, password }
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      // setCookie("accessToken", res.data.token, { path: "/" });
      toast({
        title: "Login Successfull.",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response.data);
      toast({
        title: `${error}`,
        description: "Please Check You Email and Password",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      boxShadow="0px 2px 6px rgba(0, 0, 0, 0.1)"
    >
      <Box width="90%" maxWidth="360px" padding="2">
        <Heading as="h1" marginBottom="10" textAlign={"center"}>
          Sign in
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl marginBottom="4">
            <FormLabel htmlFor="username" color="gray.500" fontSize="18px">
              Username
            </FormLabel>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="johndoe"
              onChange={(e) => setUsername(e.target.value)}
              isRequired
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="password" color="gray.500" fontSize="18px">
              Password
            </FormLabel>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
          </FormControl>

          <Button
            type="submit"
            marginTop="8"
            colorScheme="teal"
            size="lg"
            width={"100%"}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Login;
