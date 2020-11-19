import React, { useState } from "react";
import "./index.css";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Cookie from "js-cookie";

const CheckoutForm = ({
  idUser,
  price,
  productName,
  protectionCosts,
  shippingCosts,
  total,
}) => {
  // console.log("--------------price", price * 5);
  // usestate si le paiement est validé
  const [confirm, setConfirm] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const idBuyer = Cookie.get("idToken");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // on/Stripe récupère les données de la cb entrées par le user
      const cardElement = elements.getElement(CardElement);

      // Demande de création de token via l'API Stripe
      // on fait comme une demande axios mais là sur l'API Stripe
      const stripeResponse = await stripe.createToken(cardElement, {
        name: idBuyer,
      });
      console.log(stripeResponse);

      // On stock dans une variable le token reçu de Stripe
      const stripeToken = stripeResponse.token.id;
      // console.log(stripeToken);

      // Requête vers notre serveur
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          title: productName,
          amount: price,
        }
      );
      console.log(response.data);

      // Si le paimement est validé on passe le state à true et le message s'affiche
      if (response.data.status === "succeeded") {
        setConfirm(true);
      }
    } catch (error) {
      // On peut ici faire des conditions pour retourner les vrais alertes status ...
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="paiement-container">
        <div className="paiement-section">
          <h3>Récapitulatif de votre commande</h3>
          <div className="paiement-recap">
            <div className="name">{productName}</div>
            <div className="recap-container">
              <div className="recap">
                <span>Commande</span>
                <span>{price} €</span>
              </div>
              <div className="recap">
                <span>Frais protection acheteurs</span>
                <span>{protectionCosts} €</span>
              </div>
              <div className="recap">
                <span>Frais de port</span>
                <span>{shippingCosts} €</span>
              </div>
            </div>
            <div className="divider"></div>
            <div className="total">
              <span>Total</span>
              <span>{total} €</span>
            </div>
          </div>
          <div className="paiement-card">
            <div className="paimenet-container">
              Il ne vous reste plus qu'une étape pour vous offrir
              <span className="bold"> {productName} .</span>
              Vous allez payer
              <span className="bold"> {total} € </span>
              (frais de protection et frais de port inclus).
              <div className="divider"></div>
              {confirm ? (
                <p className="card-validation">Paiement validé, à bientôt !</p>
              ) : (
                <form className="element-card" onSubmit={handleSubmit}>
                  <CardElement />
                  <div className="button-container">
                    <button className="element-button" type="submit">
                      Valider
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
