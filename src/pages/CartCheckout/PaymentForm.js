import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const PaymentForm = () => {
  const [amount, setAmount] = useState(1000); // Example amount in cents ($10)
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded
    }

    setLoading(true);

    // Step 1: Create Payment Intent on the backend
    const { data } = await axios.post("http://localhost:4242/create-payment-intent", {
      amount,
    });

    const clientSecret = data.clientSecret;

    // Step 2: Confirm the payment on the client-side
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      console.log("Payment failed", error);
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded", paymentIntent);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="amount">Amount (USD):</label>
        <input
          id="amount"
          type="number"
          value={amount / 100}
          onChange={(e) => setAmount(e.target.value * 100)} // Convert to cents
        />
      </div>
      <div>
        <label>Card Details</label>
        <CardElement />
      </div>
      <button type="submit" disabled={loading || !stripe}>
        {loading ? "Processing…" : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;
