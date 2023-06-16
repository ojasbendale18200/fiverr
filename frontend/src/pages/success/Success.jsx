import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Box, Spinner, Text } from "@chakra-ui/react";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await axios.put(
          "https://fair-blue-cod-cape.cyclic.app/api/orders",
          {
            payment_intent,
          },
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setTimeout(() => {
          navigate("/orders");
        }, 3000);
      } catch (err) {
        console.log(err);
      }
    };

    makeRequest();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Spinner size="xl" color="green.500" thickness="4px" mb="4" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Text fontSize="xl" fontWeight="bold" mb="2">
          Payment Successful
        </Text>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Text>
          You are being redirected to the orders page. Please do not close the
          page.
        </Text>
      </motion.div>
    </Box>
  );
};

export default Success;
