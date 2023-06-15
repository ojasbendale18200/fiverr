import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data, refetch } = useQuery(`myGigs`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/gigs?userId=${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  });

  const handleDelete = async (id) => {
    let res = await axios.delete(
      `https://fair-blue-cod-cape.cyclic.app/api/gigs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    refetch();
  };

  return (
    <Flex justifyContent="center" color="#555">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <Box w="1400px" padding="50px 0px">
          <Flex justifyContent="space-between">
            <Text as="h1" fontSize="xl" fontWeight="bold">
              Gigs
            </Text>
            {currentUser.isSeller && (
              <Link to="/add">
                <Button colorScheme="teal">Add New Gig</Button>
              </Link>
            )}
          </Flex>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Sales</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((gig) => (
                <Tr key={gig._id}>
                  <Td>
                    <Image
                      className="image"
                      src={gig.cover}
                      alt=""
                      w={"50px"}
                      h={"25px"}
                      objectFit={"cover"}
                    />
                  </Td>
                  <Td>{gig.title}</Td>
                  <Td>{gig.price}</Td>
                  <Td>{gig.sales}</Td>
                  <Td>
                    <Image
                      className="delete"
                      src="./img/delete.png"
                      alt=""
                      w={"20px"}
                      cursor={"pointer"}
                      onClick={() => handleDelete(gig._id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Flex>
  );
}

export default MyGigs;
