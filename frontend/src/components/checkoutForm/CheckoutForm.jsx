import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Flex, Text, Spinner, Box, Heading } from "@chakra-ui/react";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://fiverr-1cfm.vercel.app/success",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
      //   console.log(error);
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
  
    <>
      <Heading textAlign={"center"} mt={"50px"}>
        Pay with Card
      </Heading>
      <form id="payment-form" onSubmit={handleSubmit}>
        <Box w={"20%"} margin={"auto"} mt={"130px"}>
          <Flex flexDirection="column" gap="1rem">
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <Button
              disabled={isLoading || !stripe || !elements}
              id="submit"
              type="submit"
              bg={"blue.500"}
              color={"white"}
              _hover={"none"}
            >
              <Flex alignItems="center" gap="0.5rem">
                <Text id="button-text">
                  {isLoading ? <Spinner id="spinner" /> : "Pay now"}
                </Text>
              </Flex>
            </Button>
            {/* Show any error or success messages */}
            {message && (
              <Text id="payment-message" color="red.500">
                {message}
              </Text>
            )}
          </Flex>
        </Box>
      </form>
    </>
  );
};

export default CheckoutForm;
