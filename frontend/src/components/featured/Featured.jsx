import React, { useState } from "react";

import { Box, Flex, Heading, Image, Input, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Featured() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };
  return (
    <Box
      height={{ base: "auto", md: "600px" }}
      display="flex"
      justifyContent="center"
      backgroundColor="#013914"
      color="white"
    >
      <Flex
        width={{ base: "100%", md: "1400px" }}
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: "column", md: "row" }}
        px={{ base: "20px", md: "0" }}
      >
        <Box flex="1">
          <Heading
            fontSize={{ base: "19px", md: "50px" }}
            mt={{ base: "30px", md: "initial" }}
            mb={{ base: "40px", md: "30px" }}
            ml={{ base: "45px", md: "initial" }}
          >
            Find the perfect{" "}
            <Text as="span" fontStyle="italic" fontWeight="300">
              freelance
            </Text>{" "}
            services for your business
          </Heading>
          <Box
            bg="white"
            borderRadius="5px"
            overflow="hidden"
            width={{ base: "80%", md: "80%" }}
            margin={{ base: "auto", md: "initial" }}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Flex alignItems="center" gap="10px">
                <Image
                  src="./img/search.png"
                  alt=""
                  width="20px"
                  height="20px"
                  m="10px"
                />
                <Input
                  type="text"
                  placeholder='Try "building mobile app"'
                  onChange={(e) => setInput(e.target.value)}
                  border="none"
                  outline="none"
                  _placeholder={{ color: "gray" }}
                  color={"black"}
                  focusBorderColor="transparent"
                />
              </Flex>
              <Button
                width="120px"
                height="50px"
                bg="#1dbf73"
                color="white"
                alignSelf="flex-end"
                cursor="pointer"
                onClick={handleSubmit}
                _hover={{
                  backgroundColor: "green.600",
                  cursor: "pointer",
                }}
              >
                Search
              </Button>
            </Flex>
          </Box>
          <Flex
            alignItems="center"
            gap="10px"
            mt="20px"
            visibility={{ base: "hidden", md: "visible" }}
          >
            <Text width="max-content" color="white">
              Popular:
            </Text>
            <Button
              color="white"
              border="1px solid white"
              p="5px 10px"
              borderRadius="20px"
              bg="transparent"
              fontSize="14px"
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              Web Design
            </Button>
            <Button
              color="white"
              border="1px solid white"
              p="5px 10px"
              borderRadius="20px"
              bg="transparent"
              fontSize="14px"
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              WordPress
            </Button>
            <Button
              color="white"
              border="1px solid white"
              p="5px 10px"
              borderRadius="20px"
              bg="transparent"
              fontSize="14px"
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              Logo Design
            </Button>
            <Button
              color="white"
              border="1px solid white"
              p="5px 10px"
              borderRadius="20px"
              bg="transparent"
              fontSize="14px"
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              AI Services
            </Button>
          </Flex>
        </Box>
        <Box flex="1" mt={{ base: "30px", md: "0" }}>
          <Image src="./img/man.png" alt="" objectFit="contain" height="100%" />
        </Box>
      </Flex>
    </Box>
  );
}

export default Featured;
