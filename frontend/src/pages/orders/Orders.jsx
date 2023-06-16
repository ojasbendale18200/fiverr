import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useStatStyles,
} from "@chakra-ui/react";

import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/orders`,
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

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/conversations/single/${id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      console.log(res);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await axios.post(
          `https://fair-blue-cod-cape.cyclic.app/api/conversations`,
          {
            to: currentUser.seller ? buyerId : sellerId,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <Flex textAlign="center" color="#555">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <Box w="1400px" padding="50px 0px" margin={"auto"}>
          <Text as="h1" fontSize="xl" fontWeight="bold">
            Orders
          </Text>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Price</Th>
                <Th>Contact</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((order) => (
                <Tr key={order._id}>
                  <Td>
                    <Image
                      w={"50px"}
                      h={"25px"}
                      className="image"
                      src={order.img}
                      alt=""
                    />
                  </Td>
                  <Td>{order.title}</Td>
                  <Td>{order.price}</Td>
                  <Td>
                    <Image
                      w={"25px"}
                      className="message"
                      src="./img/message.png"
                      alt=""
                      onClick={() => handleContact(order)}
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
};

export default Orders;
