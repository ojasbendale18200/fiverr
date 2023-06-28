import React, { useState } from "react";
import upload from "../../utils/upload";

import axios from "axios"
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    img: "",
    country: "",
    isSeller: false,
    desc: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSeller = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = await upload(file);
    try {
      await axios.post(
        "https://fair-blue-cod-cape.cyclic.app/api/auth/register",
        {
          ...user,
          img: url,
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <form onSubmit={handleSubmit}>
        <Box
          width={{ base: "90%", md: "1160px" }}
          padding="50px 40px"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap="130px"
        >
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            gap="10px"
            justifyContent="space-between"
          >
            <Text
              color="black"
              marginBottom="20px"
              fontWeight={"600"}
              fontSize={"xl"}
            >
              Create a new account
            </Text>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Username
              </FormLabel>
              <Input
                name="username"
                type="text"
                placeholder="johndoe"
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Email
              </FormLabel>
              <Input
                name="email"
                type="email"
                placeholder="email"
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Password
              </FormLabel>
              <Input
                name="password"
                type="password"
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Profile Picture
              </FormLabel>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </FormControl>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Country
              </FormLabel>
              <Input
                name="country"
                type="text"
                placeholder="Usa"
                onChange={handleChange}
                isRequired
              />
            </FormControl>
            <Button
              type="submit"
              bgColor={"#1dbf73"}
              color={"white"}
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              Register
            </Button>
          </Box>
          <Box
            flex="1"
            display="flex"
            flexDirection="column"
            gap="10px"
            justifyContent="space-between"
          >
            <Text
              color="black"
              marginBottom="20px"
              fontWeight={"600"}
              fontSize={"xl"}
            >
              I want to become a seller
            </Text>
            <Box display="flex" alignItems="center" gap="10px">
              <FormLabel color="gray" fontSize="18px">
                Activate the seller account
              </FormLabel>
              <Switch onChange={handleSeller} />
            </Box>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Phone Number
              </FormLabel>
              <Input
                name="phone"
                type="text"
                placeholder="+1 234 567 89"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel color="gray" fontSize="18px">
                Description
              </FormLabel>
              <Textarea
                placeholder="A short description of yourself"
                name="desc"
                id=""
                cols="30"
                rows="10"
                onChange={handleChange}
              />
            </FormControl>
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default Register;
