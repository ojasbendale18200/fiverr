import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Loading from "../../components/Loading";

function MyGigs() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  const getMyGigs = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/gigs?userId=${currentUser._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(true);
      throw new Error(error.message);
    }
  };

  const handleDelete = async (id) => {
    let res = await axios.delete(
      `https://fair-blue-cod-cape.cyclic.app/api/gigs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      }
    );
    getMyGigs();
  };

  useEffect(() => {
    getMyGigs();
  }, []);

  return (
    <Flex justifyContent="center" color="#555">
      {isLoading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          margin={"auto"}
          my={"60px"}
        />
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
