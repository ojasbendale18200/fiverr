import React from "react";
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
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";

const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const { isLoading, error, data } = useQuery(`orders`, async () => {
    try {
      const response = await axios.get(
        `https://fair-blue-cod-cape.cyclic.app/api/orders`,
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
  });

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

  return (
    // <div className="orders">
    //   {isLoading ? (
    //     "loading"
    //   ) : error ? (
    //     "error"
    //   ) : (
    //     <div className="container">
    //       <div className="title">
    //         <h1>Orders</h1>
    //       </div>
    //       <table>
    //         <tr>
    //           <th>Image</th>
    //           <th>Title</th>
    //           <th>Price</th>
    //           <th>Contact</th>
    //         </tr>
    //         {data.map((order) => (
    //           <tr key={order._id}>
    //             <td>
    //               <img className="image" src={order.img} alt="" />
    //             </td>
    //             <td>{order.title}</td>
    //             <td>{order.price}</td>
    //             <td>
    //               <img
    //                 className="message"
    //                 src="./img/message.png"
    //                 alt=""
    //                 onClick={() => handleContact(order)}
    //               />
    //             </td>
    //           </tr>
    //         ))}
    //       </table>
    //     </div>
    //   )}
    // </div>
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
