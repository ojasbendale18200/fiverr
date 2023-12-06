import React, { useEffect, useState } from "react";

import {
  Box,
  Flex,
  Heading,
  Image,
  Input,
  Button,
  Text,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

function Featured() {
  const [input, setInput] = useState("");
  const [suggestion, setSuggetion] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  useEffect(() => {
    const debounce = (func, delay) => {
      let timeoutId;
      return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://fair-blue-cod-cape.cyclic.app/api/gigs?search=${input}`
        );
        const data = await response.json();

        setSuggetion(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const debouncedFetchData = debounce(fetchData, 1000);

    if (input.trim() !== "") {
      debouncedFetchData();
    }

    return () => {
      clearTimeout(debouncedFetchData);
    };
  }, [input]);

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
            position={"relative"}
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
                isDisabled
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
          {input && (
            <Box
              border="1px solid gray"
              borderRadius="5px"
              position="absolute"
              // top="20px"
              zIndex="999"
              bgColor="white"
              overflow="scroll"
              w="37%"
              maxH="400px"
            >
              <List spacing={6}>
                {suggestion.map((item) => {
                  return (
                    <Link to={`/gig/${item._id}`}>
                      <ListItem
                        color="black"
                        fontSize="lg"
                        cursor="pointer"
                        textAlign={"left"}
                        pl="10px"
                        pb={2}
                        _hover={{
                          textDecoration: "none",
                          bg: "#D3D3D3",
                        }}
                      >
                        <ListIcon as={BiSearchAlt2} />
                        {item.title}
                      </ListItem>
                    </Link>
                  );
                })}
              </List>
            </Box>
          )}
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
