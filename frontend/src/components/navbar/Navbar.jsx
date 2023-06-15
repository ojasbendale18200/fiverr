import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import "./Navbar.scss";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Box,
  Flex,
  Link,
  Button,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken"]);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  const handleLogout = async () => {
    try {
      await axios.post("https://fair-blue-cod-cape.cyclic.app/api/auth/logout");
      localStorage.setItem("currentUser", null);
      removeCookie("accessToken");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Box
      className={active || pathname !== "/" ? "navbar active" : "navbar"}
      display="flex"
      flexDirection="column"
      alignItems="center"
      backgroundColor={active || pathname !== "/" ? "white" : "#013914"}
      color={active || pathname !== "/" ? "black" : "white"}
      position="sticky"
      top="0"
      zIndex="999"
      transition="0.5s all ease"
    >
      <Flex
        className="container"
        width="100%"
        maxWidth="1400px"
        alignItems="center"
        justifyContent="space-between"
        padding="20px 0px"
        px={{ base: "20px", md: "0" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        <Box>
          <Link className="link" href="/">
            <Text
              as="span"
              fontSize="34px"
              fontWeight="bold"
              color={active || pathname !== "/" ? "black" : "white"}
            >
              liverr
            </Text>
          </Link>
          <Text as="span" className="dot" fontWeight="bold" color="#1dbf73">
            .
          </Text>
        </Box>
        <Flex
          className="links"
          alignItems="center"
          gap="24px"
          fontFamily="Montserrat"
          fontWeight="500"
        >
          <Text as="span" whiteSpace="nowrap">
            Liverr Business
          </Text>
          <Text as="span" whiteSpace="nowrap">
            Explore
          </Text>
          <Text as="span" whiteSpace="nowrap">
            English
          </Text>
          {!currentUser?.isSeller && <Text as="span">Become a Seller</Text>}
          {currentUser ? (
            <Flex
              as="div"
              className="user"
              onClick={() => setOpen(!open)}
              alignItems="center"
              gap="10px"
              cursor="pointer"
              position="relative"
            >
              <Image
                src={currentUser.img || "/img/noavatar.jpg"}
                alt=""
                width="32px"
                height="32px"
                borderRadius="50%"
                objectFit="cover"
              />
              <Text>{currentUser?.username}</Text>
              {open && (
                <Box
                  className="options"
                  position="absolute"
                  top="50px"
                  right="0"
                  padding="20px"
                  backgroundColor="white"
                  borderRadius="10px"
                  zIndex="999"
                  border="1px solid lightgrey"
                  display="flex"
                  flexDirection="column"
                  gap="10px"
                  width="200px"
                  fontWeight="300"
                  color="gray"
                >
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" href="/mygigs">
                        Gigs
                      </Link>
                      <Link className="link" href="/add">
                        Add New Gig
                      </Link>
                    </>
                  )}
                  <Link className="link" href="/orders">
                    Orders
                  </Link>
                  <Link className="link" href="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/" onClick={handleLogout}>
                    Logout
                  </Link>
                </Box>
              )}
            </Flex>
          ) : (
            <>
              <Link className="link" href="/login">
                <Text as="span">Sign in</Text>
              </Link>
              <Link className="link" href="/register">
                <Button>Join</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
      {useBreakpointValue({ base: false, md: true }) &&
        (active || pathname !== "/") && (
          <>
            <Box
              as="hr"
              width="calc(100% - 2px)"
              height="0"
              borderTop="0.5px solid #ebe9e9"
              borderBottom="0.5px solid #ebe9e9"
            />
            <Flex
              className="menu"
              width="100%"
              maxWidth="1400px"
              padding="10px 0px"
              justifyContent="space-between"
              color="gray"
              fontWeight="300"
              fontFamily="Montserrat"
              flexDirection={{ base: "column", md: "row" }}
            >
              <Link className="link menuLink" to="/">
                Graphics & Design
              </Link>
              <Link className="link menuLink" to="/">
                Video & Animation
              </Link>
              <Link className="link menuLink" to="/">
                Writing & Translation
              </Link>
              <Link className="link menuLink" to="/">
                AI Services
              </Link>
              <Link className="link menuLink" to="/">
                Digital Marketing
              </Link>
              <Link className="link menuLink" to="/">
                Music & Audio
              </Link>
              <Link className="link menuLink" to="/">
                Programming & Tech
              </Link>
              <Link className="link menuLink" to="/">
                Business
              </Link>
              <Link className="link menuLink" to="/">
                Lifestyle
              </Link>
            </Flex>
            <Box
              as="hr"
              width="calc(100% - 2px)"
              height="0"
              borderTop="0.5px solid #ebe9e9"
              borderBottom="0.5px solid #ebe9e9"
            />
          </>
        )}
    </Box>
  );
}

export default Navbar;
