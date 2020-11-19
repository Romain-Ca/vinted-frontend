import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";

const OfferDetails = ({ data }) => {
  const history = useHistory();
  // Changer l'IdUser par l'Id de celui qui achète
  const idUser = data.owner._id;
  const price = data.product_price;
  const productName = data.product_name;
  const protectionCosts = (price / 10).toFixed(2);
  const shippingCosts = (price / 5).toFixed(2);
  const total = (
    Number(price) +
    Number(protectionCosts) +
    Number(shippingCosts)
  ).toFixed(2);
  // console.log(total);

  return (
    <section className="offer-body">
      <div className="offer-container">
        <div className="pictures-container">
          {data.product_pictures.length > 0 ? (
            data.product_pictures.map((item, i) => {
              return (
                <div index={i}>
                  <img
                    className="offer-pictures"
                    src={item.secure_url}
                    alt={item.name}
                  />
                </div>
              );
            })
          ) : (
            <div>
              <img
                className="offer-pictures"
                src={data.product_image.url}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="offer-infos">
          <div>
            <span className="offer-price">{data.product_price} €</span>
            {data.product_details.map((elem, index) => {
              // Object.keys pour récupérer les clés de l'objet
              const keys = Object.keys(elem);
              return (
                <div className="offer-list">
                  <div className="list-keys" key={index}>
                    {keys[0]}
                  </div>
                  <div className="list-elem">{elem[keys[0]]}</div>
                </div>
              );
            })}
          </div>
          <div className="divider"></div>
          <div className="owner-content">
            <p className="owner-name">{data.product_name}</p>
            <p className="owner-description">{data.product_description}</p>
            <div className="owner-avatar">
              {data.owner.account.avatar && (
                <img
                  className="avatar"
                  src={data.owner.account.avatar.secure_url}
                  alt={data.title}
                />
              )}
              <span>{data.owner.account.username}</span>
            </div>
          </div>
          <button
            onClick={() => {
              history.push("/paiement", {
                idUser: idUser,
                price: price,
                productName: productName,
                protectionCosts: protectionCosts,
                shippingCosts: shippingCosts,
                total: total,
              });
            }}
          >
            Acheter
          </button>
        </div>
      </div>
    </section>
  );
};

export default OfferDetails;
