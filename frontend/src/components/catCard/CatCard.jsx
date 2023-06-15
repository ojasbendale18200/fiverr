import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link, Box, Text, Image } from "@chakra-ui/react";
// import "./CatCard.scss";

function CatCard({ card }) {
  return (
    <RouterLink to="/gigs?cat=design">
      <Box
        className="catCard"
        width={{ base: "100%", md: "252px" }}
        height={{ base: "auto", md: "344px" }}
        color="white"
        borderRadius="5px"
        position="relative"
        cursor="pointer"
        mb={{ base: "20px", md: "0" }}
      >
        <Image
          src={card.img}
          alt=""
          objectFit="cover"
          width="100%"
          height="100%"
        />
        <Text
          className="desc"
          fontWeight="300"
          position="absolute"
          top="15px"
          left="15px"
          fontSize={{ base: "3xl", md: "xl" }}
        >
          {card.desc}
        </Text>
        <Text
          className="title"
          position="absolute"
          top="40px"
          left="15px"
          // fontSize="24px"
          fontWeight="500"
          fontSize={{ base: "3xl", md: "xl" }}
        >
          {card.title}
        </Text>
      </Box>
    </RouterLink>
  );
}
export default CatCard;
