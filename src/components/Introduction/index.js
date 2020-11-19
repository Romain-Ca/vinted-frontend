import React from "react";
import "./index.css";
import { useHistory } from "react-router-dom";
import Forme from "../../images/forme.svg";

const Introduction = ({ token }) => {
  const history = useHistory();
  return (
    <>
      {/* INTRODUCTION */}
      <section className="introduction">
        <div className="home-hero-bg-img">
          <img src={Forme} alt="forme" className="home-hero-forme" />
        </div>
        <div className="container-padding-horizontal">
          <div>
            <div>
              <div className="card-promo">
                <h1>Prêts à faire du tri dans vos placards ?</h1>

                <button
                  onClick={() => {
                    if (token) {
                      history.push("/publish");
                    } else {
                      history.push("/login");
                    }
                  }}
                  className="card-login"
                >
                  Commencer à vendre
                </button>

                <div className="link-explication">
                  Découvrir comment ça marche
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Introduction;
