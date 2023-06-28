import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NI6YhSDgL6ayrPoUwGzni1mVd6CAcvL1xEYqPGrMbZfsvCoal8q6yqkFvuqFR3DHjyKaqdtDlm4MLbA9YEtpOeF00zItWX72B"
);
function Pay() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          `https://fair-blue-cod-cape.cyclic.app/api/orders/create-payment-intent/${id}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Pay;
