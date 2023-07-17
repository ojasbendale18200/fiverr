import React from "react";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  useBreakpointValue,
  AspectRatio,
  Container,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";

function Home() {
  const columnCount = useBreakpointValue({ base: 2, sm: 3, md: 5 });
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      <Slider
        slidesToShow={5}
        slidesToScroll={1}
        dots={true}
        responsive={[
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
        ]}
      >
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slider>
      <Box bg={"#f1fdf7"} py={{ base: 6, lg: 10 }} mt={"40px"} color={"black"}>
        <Flex
          maxW={{ base: "100%", lg: "1400px" }}
          mx="auto"
          px={{ base: 4, lg: 0 }}
          direction={{ base: "column", lg: "row" }}
          alignItems="center"
          justify="space-between"
        >
          <Box flex={{ base: "1", lg: "2" }} mr={{ base: 0, lg: 20 }}>
            <Heading fontSize={{ base: "xl", lg: "2xl" }} mb={4}>
              A whole world of freelance talent at your fingertips
            </Heading>
            <Box mb={6}>
              <Flex align="center" mb={2}>
                <Image src="./img/check.png" alt="" w="24px" h="24px" mr={2} />
                <Text fontWeight="500">The best for every budget</Text>
              </Flex>
              <Text fontWeight="300">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </Text>
            </Box>
            <Box mb={6}>
              <Flex align="center" mb={2}>
                <Image src="./img/check.png" alt="" w="24px" h="24px" mr={2} />
                <Text fontWeight="500">Quality work done quickly</Text>
              </Flex>
              <Text fontWeight="300">
                Find the right freelancer to begin working on your project
                within minutes.
              </Text>
            </Box>
            <Box mb={6}>
              <Flex align="center" mb={2}>
                <Image src="./img/check.png" alt="" w="24px" h="24px" mr={2} />
                <Text fontWeight="500">Protected payments, every time</Text>
              </Flex>
              <Text fontWeight="300">
                Always know what you'll pay upfront. Your payment isn't released
                until you approve the work.
              </Text>
            </Box>
            <Box mb={6}>
              <Flex align="center" mb={2}>
                <Image src="./img/check.png" alt="" w="24px" h="24px" mr={2} />
                <Text fontWeight="500">24/7 support</Text>
              </Flex>
              <Text fontWeight="300">
                Find high-quality services at every price point. No hourly
                rates, just project-based pricing.
              </Text>
            </Box>
          </Box>
          <Box flex={{ base: "1", lg: "1" }}>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/rMGW4Sp33xw"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </Box>
        </Flex>
      </Box>

      <Box alignContent={"start"} py={"100px"}>
        <Heading color={"#555"} textAlign={"center"} pb={"30px"}>
          Explore the marketplace
        </Heading>
        <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={4}>
          <GridItem
            className="item"
            width={{ base: "140px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Graphics & Design</Text>
          </GridItem>
          <GridItem
            className="item"
            width={{ base: "120px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Digital Marketing</Text>
          </GridItem>
          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Writing & Translation</Text>
          </GridItem>

          <GridItem
            className="item"
            width={{ base: "140px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Video & Animation</Text>
          </GridItem>

          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Music & Audio</Text>
          </GridItem>

          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Programming & Tech</Text>
          </GridItem>

          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Business</Text>
          </GridItem>
          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Lifestyle</Text>
          </GridItem>
          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Data</Text>
          </GridItem>

          <GridItem
            className="item"
            width={{ base: "150px", md: "250px" }}
            height="150px"
            display="flex"
            flexDirection="column"
            gap="10px"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            cursor="pointer"
            _hover={{
              ".line": {
                width: "80px",
                backgroundColor: "#1dbf73",
              },
            }}
          >
            <Image
              src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
              alt=""
              width={"50px"}
              height={"50px"}
            />
            <Box
              width="50px"
              height="2px"
              backgroundColor="lightgray"
              transition="all .3s ease"
              className="line"
            ></Box>
            <Text fontWeight={"300"}>Photography</Text>
          </GridItem>
        </Grid>
      </Box>

      <Box bg="#0d084d" py={{ base: "50px", md: "100px" }} textAlign="center">
        <Flex
          className="container"
          maxW={{ base: "100%", md: "1400px" }}
          mx="auto"
          flexDirection={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
          gap={{ base: "50px", md: "200px" }}
        >
          <Box flex={{ base: "none", md: 2 }}>
            <Heading color={"white"}>
              liverr <i>business</i>
            </Heading>
            <Heading ing color={"white"} mb="15px">
              A business solution designed for <i>teams</i>
            </Heading>
            <Text color={"white"} mb="20px">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </Text>
            <Flex flexDirection="column" gap="20px">
              <Flex align="center">
                <Image
                  src="./img/check.png"
                  alt=""
                  boxSize="24px"
                  mr="10px"
                  mb={{ base: "15px", md: "initial" }}
                />
                <Text color={"white"}>
                  Connect to freelancers with proven business experience
                </Text>
              </Flex>
              <Flex align="center">
                <Image
                  src="./img/check.png"
                  alt=""
                  boxSize="24px"
                  mr="10px"
                  mb={{ base: "15px", md: "initial" }}
                />
                <Text color={"white"}>
                  Get matched with the perfect talent by a customer success
                </Text>
              </Flex>
              <Flex align="center">
                <Image
                  src="./img/check.png"
                  alt=""
                  boxSize="24px"
                  mr="10px"
                  mb={{ base: "15px", md: "initial" }}
                />
                <Text color={"white"}>
                  Manage teamwork and boost productivity with one powerful
                </Text>
              </Flex>
            </Flex>
            <Button
              bg={{ base: "#1dbf73", md: "transparent" }}
              color={{ base: "white", md: "#1dbf73" }}
              px="20px"
              py="10px"
              borderRadius="5px"
              fontSize="16px"
              cursor="pointer"
              mt="20px"
              borderWidth={{ base: "0px", md: "1px" }}
              borderColor={{ base: "transparent", md: "#1dbf73" }}
            >
              Explore Liverr Business
            </Button>
          </Box>
          <Box flex={{ base: "none", md: 3 }}>
            <Image
              src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
              alt=""
              w="100%"
            />
          </Box>
        </Flex>
      </Box>
      <Box pt={"40px"} pb={"120px"}>
        <Slider
          slidesToShow={5}
          slidesToScroll={1}
          dots={true}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
              },
            },
          ]}
        >
          {projects.map((card) => (
            <ProjectCard key={card.id} card={card} />
          ))}
        </Slider>
      </Box>
    </div>
  );
}

export default Home;
