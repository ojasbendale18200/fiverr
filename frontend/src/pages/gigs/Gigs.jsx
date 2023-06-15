import React, { useEffect, useRef, useState } from "react";
// import "./Gigs.scss";
import GigCard from "../../components/gigCard/GigCard";
import axios from "axios";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Grid,
  useBreakpointValue,
} from "@chakra-ui/react";

function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const { search } = useLocation();
  const columnCount = useBreakpointValue({ base: 1, sm: 2, md: 4 });

  const { isLoading, error, data, refetch } = useQuery("repoData", async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/gigs?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  return (
    // <div className="gigs">
    //   <div className="container">
    //     <span className="breadcrumbs">Liverr > Graphics & Design ></span>
    //     <h1>Designs</h1>
    //     <p>
    //       Explore the boundaries of art and technology with Liverr's AI artists
    //     </p>
    //     <div className="menu">
    //       <div className="left">
    //         <span>Budget</span>
    //         <input ref={minRef} type="number" placeholder="min" />
    //         <input ref={maxRef} type="number" placeholder="max" />
    //         <button onClick={apply}>Apply</button>
    //       </div>
    //       <div className="right">
    //         <span className="sortBy">Sort by</span>
    //         <span className="sortType">
    //           {sort === "sales" ? "Best Selling" : "Newest"}
    //         </span>
    //         <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
    //         {open && (
    //           <div className="rightMenu">
    //             {sort === "sales" ? (
    //               <span onClick={() => reSort("createdAt")}>Newest</span>
    //             ) : (
    //               <span onClick={() => reSort("sales")}>Best Selling</span>
    //             )}
    //             <span onClick={() => reSort("sales")}>Popular</span>
    //           </div>
    //         )}
    //       </div>
    //     </div>
    //     <div className="cards">
    //       {isLoading
    //         ? "loading"
    //         : error
    //         ? "Something went wrong!"
    //         : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
    //     </div>
    //   </div>
    // </div>
    <Box width="100%" display="flex" justifyContent="center">
      <Flex width="1400px" padding="30px 0px" flexDirection="column" gap="15px">
        <Text
          fontWeight="300"
          textTransform="uppercase"
          fontSize="13px"
          color="#555"
        >
          Liverr > Graphics & Design >
        </Text>
        <Text as="h1"></Text>
        <Text color="#999" fontWeight="300">
          Explore the boundaries of art and technology with Liverr's AI artists
        </Text>
        <Flex align="center" justify="space-between" marginBottom="20px">
          <Flex align="center" gap="10px" color="#555" fontWeight="300">
            <Text>Budget</Text>
            <Input type="number" ref={minRef} placeholder="min" />
            <Input type="number" ref={maxRef} placeholder="max" />
            <Button
              background="#1dbf73"
              color="white"
              fontWeight="500"
              borderRadius="5px"
              cursor="pointer"
              onClick={apply}
              px={"30px"}
              _hover={{
                backgroundColor: "green.600",
                cursor: "pointer",
              }}
            >
              Apply
            </Button>
          </Flex>
          <Flex align="center" gap="10px" position="relative">
            <Text color="#555" fontWeight="300" className="sortBy">
              Sort by
            </Text>
            <Text fontWeight="500" className="sortType">
              {sort === "sales" ? "Popular" : "Newest"}
            </Text>
            <Menu>
              <MenuButton>
                <Image
                  src="./img/down.png"
                  alt=""
                  width="15px"
                  cursor="pointer"
                />
              </MenuButton>
              <MenuList>
                {/* Display dynamic menu options here */}
                <MenuItem onClick={() => reSort("createdAt")}>Newest</MenuItem>

                <MenuItem onClick={() => reSort("sales")}>Popular</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        <Grid
          templateColumns={`repeat(${columnCount}, 1fr)`}
          margin={"auto"}
          gap={5}
        >
          {isLoading
            ? "loading"
            : error
            ? "Something went wrong!"
            : data?.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </Grid>
      </Flex>
    </Box>
  );
}

export default Gigs;
