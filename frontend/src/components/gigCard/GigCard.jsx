import React, { useEffect, useState } from "react";
// import "./GigCard.scss";
import { Link } from "react-router-dom";
// import { useQuery } from "react-query";
import {
  Box,
  Flex,
  Image,
  Text,
  Divider,
  Badge,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";

const GigCard = ({ item }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const getGig = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/users/${item.userId}`
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getGig();
  }, []);

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <Box
        width="335px"
        height="550px"
        border="1px solid rgb(228, 228, 228)"
        marginBottom="40px"
      >
        <Image
          src={item?.cover}
          alt=""
          width="100%"
          height="50%"
          // objectFit="cover"
        />
        <Flex
          padding="10px 20px"
          flexDirection="column"
          gap="20px"
          className="info"
        >
          {/* Render user information here */}
          {isLoading ? (
            "loading"
          ) : error ? (
            "Something went wrong!"
          ) : (
            <Box display={"flex"} alignItems={"center"} gap={"10px"}>
              <Image
                src={data?.img || "/img/noavatar.jpg"}
                alt=""
                width={"26px"}
                height={"26px"}
                borderRadius={"50%"}
                objectFit={"cover"}
              />
              <Text>{data?.username}</Text>
            </Box>
          )}
          <Box>
            <Heading as="h3" size={"md"} mb={"10px"}>
              {item.title}
            </Heading>
            <Text color="#111">{item?.desc}</Text>
          </Box>
          <Flex alignItems="center" gap="5px" className="star">
            <Image src="./img/star.png" alt="" height="14px" width="14px" />
            <Text fontSize="14px" fontWeight="bold" color="#ffc108">
              {item?.totalStars}
            </Text>
          </Flex>
        </Flex>
        <Divider height="0" border="0.5px solid rgb(228, 228, 228)" />
        <Flex
          padding="10px 20px"
          alignItems="center"
          justifyContent="space-between"
          className="detail"
        >
          <Image
            src="./img/heart.png"
            alt=""
            width="16px"
            height="16px"
            cursor="pointer"
            objectFit="cover"
          />
          <Flex flexDirection="column" alignItems="flex-end">
            <Text color="#999" fontSize="12px">
              STARTING AT
            </Text>
            <Text color="#555" fontSize="18px" fontWeight="400" textAlign="end">
              $ {item?.price}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Link>
  );
};

export default GigCard;
