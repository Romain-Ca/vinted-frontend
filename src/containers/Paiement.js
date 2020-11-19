import React from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../components/CheckoutForm";
import { Redirect } from "react-router-dom";

const Paiement = ({ token }) => {
  // Ceci est ma clef publique sur le site de Stripe
  const stripePromise = loadStripe("pk_test_5z9rSB8XwuAOihoBixCMfL6X");
  const location = useLocation();
  // console.log(location.state);
  const {
    idUser,
    price,
    productName,
    protectionCosts,
    shippingCosts,
    total,
  } = location.state;
  return token ? (
    //   Tout les enfants de Elements ont accès a stripe
    <Elements stripe={stripePromise}>
      <CheckoutForm
        idUser={idUser}
        price={price}
        productName={productName}
        protectionCosts={protectionCosts}
        shippingCosts={shippingCosts}
        total={total}
      />
    </Elements>
  ) : (
    <Redirect to="/login/" />
  );
};

export default Paiement;
