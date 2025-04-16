import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Envoyer paymentMethod.id au serveur pour créer un paiement
      const response = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: 1000,
        }), // Remplacez 1000 par le montant en centimes
      });

      const paymentIntent = await response.json();

      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
      );

      if (confirmError) {
        console.error(confirmError);
      } else {
        console.log("Payment succeeded!");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
  );
};

const Home = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Home;
