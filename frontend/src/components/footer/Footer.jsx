import React from "react";

import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      className="footer"
      color="#666"
      py={{ base: "50px", md: "0px" }}
      mt={{ base: "50px", md: "0px" }}
      textAlign="center"
    >
      <Box maxW={{ base: "100%", md: "1400px" }} mx="auto">
        <Flex
          className="top"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-between"
          mb="50px"
        >
          <Box className="item" alignContent={"start"}>
            <Heading fontSize="16px" color="#555" mb={"10px"}>
              Categories
            </Heading>

            <Text fontWeight="300">Graphics & Design</Text>
            <Text fontWeight="300">Digital Marketing</Text>
            <Text fontWeight="300">Writing & Translation</Text>
            <Text fontWeight="300">Video & Animation</Text>
            <Text fontWeight="300">Music & Audio</Text>
            <Text fontWeight="300">Programming & Tech</Text>
            <Text fontWeight="300">Data</Text>
            <Text fontWeight="300">Business</Text>
            <Text fontWeight="300">Lifestyle</Text>
            <Text fontWeight="300">Photography</Text>
            <Text fontWeight="300">Sitemap</Text>
          </Box>
          <Box className="item">
            <Heading fontSize="16px" color="#555" mb={"10px"}>
              About
            </Heading>
            <Text fontWeight="300">Press & News</Text>
            <Text fontWeight="300">Partnerships</Text>
            <Text fontWeight="300">Privacy Policy</Text>
            <Text fontWeight="300">Terms of Service</Text>
            <Text fontWeight="300">Intellectual Property Claims</Text>
            <Text fontWeight="300">Investor Relations</Text>
            <Text fontWeight="300">Contact Sales</Text>
          </Box>
          <Box className="item">
            <Heading fontSize="16px" color="#555" mb={"10px"}>
              Support
            </Heading>
            <Text fontWeight="300">Help & Support</Text>
            <Text fontWeight="300">Trust & Safety</Text>
            <Text fontWeight="300">Selling on Liverr</Text>
            <Text fontWeight="300">Buying on Liverr</Text>
          </Box>
          <Box className="item">
            <Heading fontSize="16px" color="#555" mb={"10px"}>
              Community
            </Heading>
            <Text fontWeight="300">Customer Success Stories</Text>
            <Text fontWeight="300">Community hub</Text>
            <Text fontWeight="300">Forum</Text>
            <Text fontWeight="300">Events</Text>
            <Text fontWeight="300">Blog</Text>
            <Text fontWeight="300">Influencers</Text>
            <Text fontWeight="300">Affiliates</Text>
            <Text fontWeight="300">Podcast</Text>
            <Text fontWeight="300">Invite a Friend</Text>
            <Text fontWeight="300">Become a Seller</Text>
            <Text fontWeight="300">Community Standards</Text>
          </Box>
          <Box className="item">
            <Heading fontSize="16px" color="#555" mb={"10px"}>
              More From Fiverr
            </Heading>
            <Text fontWeight="300">Liverr Business</Text>
            <Text fontWeight="300">Liverr Pro</Text>
            <Text fontWeight="300">Liverr Logo Maker</Text>
            <Text fontWeight="300">Liverr Guides</Text>
            <Text fontWeight="300">Get Inspired</Text>
            <Text fontWeight="300">Liverr Select</Text>
            <Text fontWeight="300">ClearVoice</Text>
            <Text fontWeight="300">Liverr Workspace</Text>
            <Text fontWeight="300">Learn</Text>
            <Text fontWeight="300">Working Not Working</Text>
          </Box>
        </Flex>
        <hr />
        <Flex
          className="bottom"
          alignItems="center"
          justifyContent="space-between"
          py={"30px"}
        >
          <Flex className="left" alignItems="center" gap="20px">
            <Heading fontSize="16px">liverr</Heading>
            <Text fontSize="13px" whiteSpace="nowrap">
              © Liverr International Ltd. 2023
            </Text>
          </Flex>
          <Flex className="right" alignItems="center" gap="30px">
            <Flex className="social" gap="20px">
              <Image src="/img/twitter.png" alt="" boxSize="24px" />
              <Image src="/img/facebook.png" alt="" boxSize="24px" />
              <Image src="/img/linkedin.png" alt="" boxSize="24px" />
              <Image src="/img/pinterest.png" alt="" boxSize="24px" />
              <Image src="/img/instagram.png" alt="" boxSize="24px" />
            </Flex>
            <Flex className="link" alignItems="center" gap="10px">
              <Image src="/img/language.png" alt="" boxSize="24px" />
              <Text>English</Text>
            </Flex>
            <Flex className="link" alignItems="center" gap="10px">
              <Image src="/img/coin.png" alt="" boxSize="24px" />
              <Text>USD</Text>
            </Flex>
            <Image src="/img/accessibility.png" alt="" boxSize="24px" />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
