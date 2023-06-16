import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [userInfos, setUserInfos] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getAllMessages = async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/conversations`,
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

  const handleRead = async (id) => {
    try {
      let res = await axios.put(
        `https://fair-blue-cod-cape.cyclic.app/api/conversations/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      getAllMessages();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  useEffect(() => {
    const fetchUserInfos = async () => {
      const newInfos = await Promise.all(
        data.map(async (c) => {
          const userId = currentUser.isSeller ? c.buyerId : c.sellerId;
          const response = await fetch(
            `https://fair-blue-cod-cape.cyclic.app/api/users/${userId}`
          );
          const userData = await response.json();
          return {
            ...c,
            userInfo: userData,
          };
        })
      );
      setUserInfos(newInfos);
    };

    fetchUserInfos();
  }, [currentUser.isSeller, data]);

  return (
    <Box className="messages" display="flex" justifyContent="center">
      {isLoading ? (
        "loading"
      ) : error ? (
        "error"
      ) : (
        <Box
          className="container"
          width={["100%", "100%", "1400px"]}
          padding="50px 0"
        >
          <Box
            className="title"
            display="flex"
            justifyContent="space-between"
            mb="20px"
          >
            <Heading as="h1" fontSize="xl">
              Messages
            </Heading>
          </Box>
          <Table width="100%">
            <Thead>
              <Tr>
                <Th>{currentUser.isSeller ? "Buyer" : "Seller"}</Th>
                <Th>Last Message</Th>
                <Th>Date</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {userInfos.map((c) => (
                <Tr
                  className={
                    ((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) &&
                    "active"
                  }
                  key={c.id}
                >
                  <Td>
                    <Text textTransform="capitalize" fontWeight={"600"}>
                      {c.userInfo.username}
                    </Text>
                  </Td>
                  <Td>
                    <Link to={`/message/${c.id}`} className="link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </Td>
                  <Td color="gray">{moment(c.updatedAt).fromNow()}</Td>
                  <Td>
                    {((currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer)) && (
                      <Button
                        onClick={() => handleRead(c.id)}
                        colorScheme="green"
                        size="sm"
                      >
                        Mark as Read
                      </Button>
                    )}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </Box>
  );
};

export default Messages;
