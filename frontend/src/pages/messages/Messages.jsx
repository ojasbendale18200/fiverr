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
import { useQuery } from "react-query";
import axios from "axios";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [userInfos, setUserInfos] = useState([]);

  const { isLoading, error, data, refetch } = useQuery(
    `conversations`,
    async () => {
      try {
        const response = await axios.get(
          `https://fair-blue-cod-cape.cyclic.app/api/conversations`,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

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

      refetch();
    } catch (error) {
      console.log(error);
    }
  };

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
  console.log(userInfos);
  return (
    // <div className="messages">
    //   {isLoading ? (
    //     "loading"
    //   ) : error ? (
    //     "error"
    //   ) : (
    //     <div className="container">
    //       <div className="title">
    //         <h1>Messages</h1>
    //       </div>
    //       <table>
    //         <tr>
    //           <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
    //           <th>Last Message</th>
    //           <th>Date</th>
    //           <th>Action</th>
    //         </tr>
    //         {userInfos.map((c) => (
    //           <tr
    //             className={
    //               ((currentUser.isSeller && !c.readBySeller) ||
    //                 (!currentUser.isSeller && !c.readByBuyer)) &&
    //               "active"
    //             }
    //             key={c.id}
    //           >
    //             <td>
    //               {c.userInfo.username.charAt(0).toLocaleUpperCase() +
    //                 c.userInfo.username.slice(1).toLocaleLowerCase()}
    //             </td>
    //             <td>
    //               <Link to={`/message/${c.id}`} className="link">
    //                 {c?.lastMessage?.substring(0, 100)}...
    //               </Link>
    //             </td>
    //             <td>{moment(c.updatedAt).fromNow()}</td>
    //             <td>
    //               {((currentUser.isSeller && !c.readBySeller) ||
    //                 (!currentUser.isSeller && !c.readByBuyer)) && (
    //                 <button onClick={() => handleRead(c.id)}>
    //                   Mark as Read
    //                 </button>
    //               )}
    //             </td>
    //           </tr>
    //         ))}
    //       </table>
    //     </div>
    //   )}
    // </div>
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
