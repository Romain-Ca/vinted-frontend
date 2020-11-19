import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

const Login = ({ setUser }) => {
  const [idToken, setIdToken] = useState(Cookie.get("idToken"));
  const history = useHistory();
  const location = useLocation();
  // let fromPublish;
  // if (location.state) {
  //   fromPublish = true;
  // } else {
  //   fromPublish = false;
  // }

  const fromPublish = location.state?.fromPublish ? true : false;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    if (!email) {
      return setErrorMessage2(">Un email doit être renseigné 🤗");
    } else if (!password) {
      return setErrorMessage3(">Un mot de passe doit être renseigné 🤐");
    } else if (password !== confirmation) {
      return setErrorMessage4(">Les mots de passe ne sont pas identiques 👐");
    }

    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          // J'envoie en post :
          email: email,
          password: password,
          confirmation: confirmation,
        }
      );
      if (response.data._id) {
        Cookie.set("idToken", response.data._id, { expires: 365 });
        setIdToken(response.data._id);
      }
      // On push le token dans setUser
      if (response.data.token) {
        setUser(response.data.token);
        setIsLoading(false);
        // On renvoie le user a la page Home
        // Faire ici la condition useLocation
        history.push(fromPublish ? "/publish" : "/");
      } else {
        alert("Une erreur est survenue, essayez de nouveau!");
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400)
        alert("Mauvais email et/ou mot de passe");
      console.log(error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="signlog-container">
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit} className="signlog-form">
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            placeholder="Adresse email"
          />
          <div className="form-error">{errorMessage2}</div>
          <input
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
            type="password"
            placeholder="Mot de passe"
          />
          <div className="form-error">{errorMessage3}</div>
          <input
            onChange={(event) => {
              setConfirmation(event.target.value);
            }}
            value={confirmation}
            type="password"
            placeholder="Confirmation mot de passe"
          />
          <div className="form-error">{errorMessage4}</div>
          <button
            className={
              email && password ? "validate-button" : "unvalidate-button"
            }
            disabled={isLoading ? true : false}
            type="submit"
          >
            {" "}
            {isLoading ? "Connection en cours" : "Se connecter"}
          </button>
          <Link to="/signup">
            <p>Pas encore de compte ? Inscris toi !</p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
