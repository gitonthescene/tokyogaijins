// @flow
import React from "react";

import Button from "@material-ui/core/Button";
import { publishableKey } from "./config.json";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { fetchPaymentIntent } from "./utils";

const CheckoutForm = ({ u_id }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    let clientSecret;

    fetchPaymentIntent(u_id)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Could not fetch payment intent from server");
      })
      .then((data) => {
        if (data.ok === true) {
          clientSecret = data.intent;

          // Get a reference to a mounted CardElement. Elements knows how
          // to find your CardElement because there can only ever be one of
          // each type of element.
          const cardElement = elements.getElement(CardElement);

          //  FIXME!!
          // Show a "processing ..." dialog
          // Disable Pay Button??  With a ref?

          // Use your card Element with other Stripe.js APIs
          return stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              type: "card",
              card: cardElement,
            },
          });
        } else {
          throw new Error("Could not fetch payment intent");
        }
      })
      .then((response) => {
        if (response.error) {
          console.log(response.error.message);
        }
      });
  };

  return (
    <>
      <h4>Credit Card</h4>
      <div
        style={{
          border: "solid",
          padding: "10px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "10px",
              margin: "5px",
              border: "inset",
            }}
          >
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",

                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
          <Button
            size="small"
            variant="contained"
            color="primary"
            type="submit"
            disabled={!stripe}
          >
            Pay
          </Button>
        </form>
      </div>
    </>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(publishableKey);

const Stripe = ({ u_id }) => {
  return (
    <Elements stripe={stripePromise}>
      <div
        style={{
          width: "46%",
          margin: "0 25% 0 25%",
          padding: "10px 0px 10px 20px",
        }}
      >
        <CheckoutForm u_id={u_id} />
      </div>
    </Elements>
  );
};

export default Stripe;
