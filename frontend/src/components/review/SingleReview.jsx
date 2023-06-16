import axios from "axios";
import React, { useEffect, useState } from "react";

import { Box, Flex, Image, Text } from "@chakra-ui/react";
// import "./Review.scss";

const SingleReview = ({ review }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const getSingleReview = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/users/${review.userId}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getSingleReview();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="20px"
      margin="20px 0px"
      className="review"
    >
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <Flex alignItems="center" className="user">
          <Image
            className="pp"
            src={data.img || "/img/noavatar.jpg"}
            alt=""
            height="50px"
            width="50px"
            borderRadius="50%"
          />
          <Flex flexDirection="column" pl={"10px"} className="info">
            <Text fontWeight={600}>{data.username}</Text>
            <Flex alignItems="center" gap="10px" className="country">
              <Text color="gray">{data.country}</Text>
            </Flex>
          </Flex>
        </Flex>
      )}
      <Flex gap="5px" className="stars">
        {Array(review.star)
          .fill()
          .map((item, i) => (
            <Image
              src="/img/star.png"
              alt=""
              key={i}
              height="14px"
              width="14px"
            />
          ))}
        <Text fontSize="14px" fontWeight="bold" color="#ffc108">
          {review.star}
        </Text>
      </Flex>
      <Text>{review.desc}</Text>
      <Flex alignItems="center" gap="10px" className="helpful">
        <Text>Helpful?</Text>
        <Image src="/img/like.png" alt="" width="14px" />
        <Text>Yes</Text>
        <Image src="/img/dislike.png" alt="" width="14px" />
        <Text>No</Text>
      </Flex>
    </Box>
  );
};

export default SingleReview;
