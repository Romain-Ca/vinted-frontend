import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";

//Import components
import Introduction from "../components/Introduction";
import SiteContent from "../components/SiteContent";

//import FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faSearch, faBars);

const Home = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Requête Axios
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers"
      );
      // console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <Loader
      className="loader"
      type="Puff"
      color="#2cb1ba"
      height={90}
      width={90}
    />
  ) : (
    <>
      <Introduction token={token} />
      <section className="site-content">
        {data.offers.map((item, i) => {
          return (
            <SiteContent
              index={i}
              item={item}
              data={data}
              setData={setData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          );
        })}
      </section>
    </>
  );
};

export default Home;

// Test
