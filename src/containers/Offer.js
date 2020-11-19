import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import OfferDetails from "../components/OfferDetails";

const Offer = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  // grâce à useParams(), je peux récupérer l'id de l'annonce passé dans l'url
  // cet id est important car dans ce projet, il sera utilisé pour faire une requête axios pour récupérer seulement les infos d'une annonce (celle sur laquelle on a cliqué)
  const { id } = useParams();
  // console.log("ID ====> ", id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
      );
      // console.log(response.data.product_price);
      setData(response.data);

      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return isLoading ? (
    <Loader
      className="loader"
      type="Puff"
      color="#2cb1ba"
      height={90}
      width={90}
    />
  ) : (
    <OfferDetails data={data} />
  );
};

export default Offer;
