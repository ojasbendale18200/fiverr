import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Textarea,
  Button,
} from "@chakra-ui/react";
// import "./Message.scss";

import axios from "axios";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getMessages = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/messages/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      throw new Error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = {
      conversationId: id,
      desc: e.target[0].value,
    };
    e.target[0].value = "";
    try {
      let res = await axios.post(
        `https://fair-blue-cod-cape.cyclic.app/api/messages`,
        newMessage,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return (
    <Box className="message" display="flex" justifyContent="center">
      <Box
        className="container"
        width={["100%", "100%", "1200px"]}
        margin="50px"
      >
        <Text
          className="breadcrumbs"
          fontWeight="300"
          fontSize="13px"
          color="#555"
        >
          <Link to="/messages">Messages</Link> > {currentUser.username} &gt;
        </Text>
        {isLoading ? (
          "loading"
        ) : error ? (
          "error"
        ) : (
          <VStack
            className="messages"
            margin="30px 0"
            padding="50px"
            spacing="20px"
            height="500px"
            overflow="scroll"
          >
            {data.map((m) => (
              <HStack
                key={m._id}
                maxW="600px"
                fontSize="18px"
                alignSelf={
                  m.userId === currentUser._id ? "flex-end" : "flex-start"
                }
                flexDirection={
                  m.userId === currentUser._id ? "row-reverse" : "row"
                }
              >
                <Image
                  src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                  boxSize="40px"
                  borderRadius="50%"
                  objectFit="cover"
                />
                <Text
                  maxWidth="500px"
                  p="20px"
                  bg={
                    m.userId === currentUser._id
                      ? "royalblue"
                      : "rgb(244, 241, 241)"
                  }
                  color={m.userId === currentUser._id ? "white" : "gray"}
                  borderRadius={
                    m.userId === currentUser._id
                      ? "20px 0px 20px 20px"
                      : "0px 20px 20px 20px"
                  }
                  fontWeight="300"
                >
                  {m.desc}
                </Text>
              </HStack>
            ))}
          </VStack>
        )}
        <Divider
          height="0.5px"
          borderColor="rgb(232, 230, 230)"
          marginBottom="20px"
        />
        <Box
          as="form"
          className="write"
          onSubmit={handleSubmit}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Textarea
            type="text"
            placeholder="write a message"
            width="80%"
            height="100px"
            padding="10px"
            border="1px solid lightgray"
            borderRadius="10px"
          />
          <Button
            type="submit"
            backgroundColor="#1dbf73"
            padding="20px"
            color="white"
            fontWeight="500"
            mr={{ md: "120px" }}
            ml={{ base: "20px" }}
            border="none"
            borderRadius="10px"
            cursor="pointer"
            width="100px"
            _hover={{ backgroundColor: "green.700" }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
