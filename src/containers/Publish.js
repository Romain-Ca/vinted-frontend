import React, { useState } from "react";
import axios from "axios";
import { Redirect, useHistory } from "react-router-dom";
import PublishDetails from "../components/PublishDetails";

const Publish = ({ token }) => {
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // Ne pas oublier que price est une string pour le paiement ...
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  // Le fichier image du user
  const [file, setFile] = useState({});

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Pour des requêtes avec une file il faut créer un constr objet FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("picture", file);

      //   console.log(token);

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        //   Quelles données on envoie ?
        //  L'objet formData avec toutes les datas
        formData,
        // Le token qui sera lu "Bearer token"
        {
          headers: {
            authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      // Redirection vers Offer.js avec l'_id
      if (response.data._id) {
        history.push(`/offer/${response.data._id}`);
      } else {
        alert("An error occured, please try again");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return token ? (
    <PublishDetails
      handleSubmit={handleSubmit}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      price={price}
      setPrice={setPrice}
      condition={condition}
      setCondition={setCondition}
      city={city}
      setCity={setCity}
      brand={brand}
      setBrand={setBrand}
      size={size}
      setSize={setSize}
      color={color}
      setColor={setColor}
      file={file}
      setFile={setFile}
    />
  ) : (
    //Avec redirect on peut aussi envoyer des données
    //On aurait put mettre redirect dans les routes app.js
    <Redirect to={{ pathname: "/login", state: { fromPublish: true } }} />
  );
};

export default Publish;
