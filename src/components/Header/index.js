import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Logo from "../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = ({ token, setUser }) => {
  const history = useHistory();
  return (
    <div className="header">
      <div className="header-main">
        <Link to="/">
          <div className="header-logo">
            <img className="logo" src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="search-container">
          <FontAwesomeIcon className="search-logo" icon="search" />
          <input
            className="search"
            type="text"
            placeholder="Recherche des articles"
          />
        </div>
        <div className="header-actions">
          {/* Si token existe */}
          {token ? (
            <button
              // lorsqu'on clique sur Se déconnecter
              onClick={() => {
                // on passe la valeur de tokenReceived à null
                setUser(null);
              }}
              className="signout"
            >
              Se déconnecter
            </button>
          ) : (
            // Si token n'existe pas alors on affiche
            // les 2 boutons liens pour sign et log
            <>
              <Link to="/signup">
                <button className="signup">S'inscrire</button>
              </Link>
              <Link to="/login">
                <button className="login">Se connecter</button>
              </Link>
            </>
          )}

          <button
            onClick={() => {
              if (token) {
                history.push("/publish");
              } else {
                history.push("/login");
              }
            }}
            className="sell"
          >
            Vends tes articles
          </button>
        </div>
        <div className="hidden-menu-burger">
          <Link to="/login">
            <FontAwesomeIcon className="bars" icon="bars" />
          </Link>
        </div>
      </div>
      <div className="hidden-search">
        <FontAwesomeIcon className="search-logo" icon="search" />
        <input
          className="search"
          type="text"
          placeholder="Recherche des articles"
        />
      </div>
      <div className="header-navigation">
        <span className="nav-category">Femmes</span>
        <span className="nav-category">Hommes</span>
        <span className="nav-category">Enfants</span>
        <span className="nav-category">Maison</span>
        <span className="nav-category">A propos</span>
        <span className="nav-category-last">Notre plateforme</span>
      </div>
    </div>
  );
};

export default Header;
