import React from "react";
// import "./Reviews.scss";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import SingleReview from "../review/SingleReview";
import { useCookies } from "react-cookie";
import {
  Box,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Divider,
} from "@chakra-ui/react";

function Reviews({ gigId }) {
  // const [cookies, setCookie] = useCookies(["accessToken"]);
  const accessToken = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data, refetch } = useQuery(`Reviews`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/reviews/${gigId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let obj = {
        desc: e.target[0].value,
        star: e.target[1].value,
        gigId,
      };
      let res = await axios.post(
        "https://fair-blue-cod-cape.cyclic.app/api/reviews",
        obj,
        {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
          },
        }
      );
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <Box mt={8}>
      <Text as="h2" fontWeight="bold" fontSize="xl">
        Reviews
      </Text>
      {isLoading
        ? "Loading..."
        : error
        ? "Something went wrong!"
        : data.map((review) => (
            <SingleReview key={review._id} review={review} />
          ))}
      <Flex mt={4} direction={"column"} py={"10px"}>
        <Text as="h3" fontWeight="bold" fontSize="md">
          Add a review
        </Text>
        <form onSubmit={handleSubmit}  >
          <FormControl>
            <FormLabel htmlFor="opinion">Write your opinion</FormLabel>
            <Input type="text" id="opinion" />
          </FormControl>
          <FormControl display={"flex"} justifyContent={"end"} pt={"10px"} alignItems={"center"}>
            <FormLabel htmlFor="rating">Rating</FormLabel>
            <Select id="rating" width="150px" alignSelf={"flex-end"}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </Select>
          </FormControl>
          <Flex justifyContent={"end"}>
          <Button mt={4} colorScheme="teal" type="submit" px={"10"}   >
            Send
          </Button>
          </Flex>
        </form>
      </Flex>
      <Divider my={8} />
    </Box>
  );
}

export default Reviews;
