import React, { useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Reviews from "../../components/reviews/Reviews";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Grid,
  GridItem,
  Divider,
} from "@chakra-ui/react";
import Loading from "../../components/Loading";

function Gig() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [Error, setError] = useState(false);
  const [data, setData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fair-blue-cod-cape.cyclic.app/api/gigs/single/${id}`
        );
        setData(response.data);
        const userId = response.data.userId; // Extracting userId from the response
        const userResponse = await axios.get(
          `https://fair-blue-cod-cape.cyclic.app/api/users/${userId}`
        );
        setUserData(userResponse.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        throw new Error(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <Box maxW="1400px" mx="auto" p="30px 0px">
      {isLoading ? (
        <Loading />
      ) : Error ? (
        "Something went wrong!"
      ) : (
        <Grid templateColumns={["1fr", "1fr", "2fr 1fr"]} gap={8}>
          <Box>
            <Text
              fontWeight="300"
              textTransform="uppercase"
              fontSize="13px"
              color="#555"
            >
              Liverr &gt; Graphics &amp; Design &gt;
            </Text>
            <Text as="h1" fontSize="xl" fontWeight="bold">
              {data?.title}
            </Text>
            {isLoading ? (
              "loading"
            ) : Error ? (
              "Something went wrong!"
            ) : (
              <Flex align="center" mt={2} mb={4}>
                <Image
                  src={userData?.img || "/img/noavatar.jpg"}
                  alt="User Avatar"
                  borderRadius="50%"
                  boxSize="32px"
                />
                <Text fontSize="sm" fontWeight="500" ml={2}>
                  {userData?.username}
                </Text>
                <Flex align="center" ml={2}>
                  {Array(Math.round(data?.totalStars))
                    .fill()
                    .map((item, i) => (
                      <Image src="/img/star.png" alt="" key={i} w={"4"} />
                    ))}
                  <Text fontSize="sm" fontWeight="bold" color="#ffc108" ml={1}>
                    {data?.totalStars}
                  </Text>
                </Flex>
              </Flex>
            )}
            <Box
              w={{ base: "500px", md: "900px" }}
              bgColor={"#F5F5F5"}
              my={"40px"}
            >
              <Slider
                slidesToShow={1}
                slidesToScroll={1}
                dots={true}
                className="slider"
                responsive={[
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                  {
                    breakpoint: 480,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                    },
                  },
                ]}
              >
                {data?.images?.map((img) => (
                  <Image
                    key={img}
                    src={img}
                    alt=""
                    maxH={{ base: "250px", md: "500px" }}
                    objectFit="contain"
                  />
                ))}
              </Slider>
            </Box>
            <Text as="h2" fontWeight="400" mt={4}>
              About This Gig
            </Text>
            <Text fontWeight="300" lineHeight="1.5" color="#555">
              {data?.desc}
            </Text>
            {/* Seller */}
            {isLoading ? (
              "loading"
            ) : Error ? (
              "Something went wrong!"
            ) : (
              <Box>
                <Text as="h2" fontWeight="400" mt={8}>
                  About The Seller
                </Text>
                <Flex align="center" mt={4}>
                  <Image
                    src={userData.img || "/img/noavatar.jpg"}
                    alt="User Avatar"
                    borderRadius="50%"
                    boxSize="100px"
                  />
                  <Box ml={4}>
                    <Text fontSize="xl" fontWeight="bold">
                      {userData?.username}
                    </Text>
                    <Flex align="center" mt={2}>
                      {Array(Math.round(data?.totalStars))
                        .fill()
                        .map((item, i) => (
                          <Image src="/img/star.png" alt="" key={i} w={"4"} />
                        ))}
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="#ffc108"
                        ml={1}
                      >
                        {data?.totalStars}
                      </Text>
                    </Flex>
                    <Button mt={4} variant="outline" borderRadius="5px">
                      Contact Me
                    </Button>
                  </Box>
                </Flex>
                <Box
                  mt={6}
                  border={"1px solid lightgray"}
                  borderRadius={"5px"}
                  p="20px"
                  marginTop={"20px"}
                >
                  <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <GridItem>
                      <Text fontWeight="300">From</Text>
                      <Text fontWeight="bold">{userData?.country}</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="300">Member since</Text>
                      <Text fontWeight="bold">Aug 2022</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="300">Avg. response time</Text>
                      <Text fontWeight="bold">4 hours</Text>
                    </GridItem>
                    <GridItem>
                      <Text fontWeight="300">Last delivery</Text>
                      <Text fontWeight="bold">1 day</Text>
                    </GridItem>
                    <GridItem colSpan={2}>
                      <Text fontWeight="300">Languages</Text>
                      <Text fontWeight="bold">English</Text>
                    </GridItem>
                  </Grid>
                  <Divider my={6} />
                  <Text fontWeight="300">{userData.desc}</Text>
                </Box>
              </Box>
            )}

            <Box mt={6}>
              <Reviews gigId={id} />
            </Box>
            <Divider my={6} />
          </Box>
          <Box>
            <Box
              border="1px solid lightgray"
              borderRadius="5px"
              p={4}
              width={{ base: "80%", md: "initial" }}
            >
              <Flex align="center" justify="space-between">
                <Text fontWeight="500" fontSize="lg">
                  {data?.shortTitle}
                </Text>
                <Text fontWeight="300" fontSize="2xl">
                  $ {data?.price}
                </Text>
              </Flex>
              <Text color="gray" mt={2}>
                {data?.shortDesc}
              </Text>
              <Flex align="center" justify="space-between" fontSize="sm" mt={4}>
                <Flex align="center">
                  <Image src="/img/clock.png" alt="Clock" boxSize="20px" />
                  <Text ml={2}>{data?.deliveryTime} Days Delivery</Text>
                </Flex>
                <Flex align="center">
                  <Image src="/img/recycle.png" alt="Recycle" boxSize="20px" />
                  <Text ml={2}>{data?.revisionNumber} Revisions</Text>
                </Flex>
              </Flex>
              <Box mt={4}>
                {data?.features?.map((item) => (
                  <Flex align="center" mb={2} key={item}>
                    <Image
                      src="/img/greencheck.png"
                      alt="Green Check"
                      boxSize="14px"
                    />
                    <Text ml={2}>{item}</Text>
                  </Flex>
                ))}
              </Box>
              <Link to={`/pay/${id}`}>
                <Button mt={6} colorScheme="teal" size="lg" borderRadius="5px">
                  Continue
                </Button>
              </Link>
            </Box>
          </Box>
        </Grid>
      )}
    </Box>
  );
}

export default Gig;
