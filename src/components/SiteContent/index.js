import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";

const SiteContent = ({ item }) => {
  return (
    <>
      <div className="product">
        <div className="product-owner">
          {item.owner.account.avatar && (
            <img
              className="image-pseudo"
              src={item.owner.account.avatar.secure_url}
              alt={item.product_name}
            />
          )}

          <div>
            <span className="pseudo">{item.owner.account.username}</span>
          </div>
        </div>
        <Link to={"/offer/" + item._id}>
          <img
            className="image-product"
            src={item.product_image.secure_url}
            alt={item.title}
          />
        </Link>
        <div className="product-description">
          <div className="description-price-heart">
            <div className="price">{item.product_price} €</div>
            <div className="heart-like">
              <div className="heart">
                <FontAwesomeIcon icon="heart" />
              </div>
              <div className="like">{Math.floor(Math.random(100) * 100)}</div>
            </div>
          </div>
          <div className="description-item">
            <span className="size">{item.product_details[1].TAILLE}</span>
            <span className="name">{item.product_details[0].MARQUE}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteContent;
