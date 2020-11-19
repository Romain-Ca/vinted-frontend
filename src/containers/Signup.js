import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  // Tout cela peut être passé en props
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");
  const [errorMessage3, setErrorMessage3] = useState("");
  const [errorMessage4, setErrorMessage4] = useState("");

  // permet de ne pas raffraichir la page au submit
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    // TODO si on écrit une lettre le messageError se retire !!!
    if (!username) {
      return setErrorMessage1(">Un nom d'utilisateur doit être renseigné 😮");
    } else if (!email) {
      return setErrorMessage2(">Un email doit être renseigné 🤗");
    } else if (!password) {
      return setErrorMessage3(">Un mot de passe doit être renseigné 🤐");
    } else if (password !== confirmation) {
      return setErrorMessage4(">Les mots de passe ne sont pas identiques 👐");
    }

    try {
      // Lors du onSubmit on fait une requête axios
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        // qu'est ce que j'envoie ? :
        {
          username: username,
          email: email,
          password: password,
        }
      );
      console.log(response.data.token);
      // On push le token dans setUser
      //faire un if else avant l'envoi
      if (response.data.token) {
        setUser(response.data.token);
        // On renvoie le user a la page Home
        //  -------------------------------
        //Faire des alertes pour le user avec condition
        //---------------------------------
        history.push("/");
      } else {
        alert("An error occured !");
      }
      setIsLoading(false);
    } catch (error) {
      // Merci le back pour les status
      if (error.response.status === 409) {
        alert("Email déjà utilisé sur notre site");
      }
      console.log(error.message);
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="signlog-container">
        <h2>S'inscrire</h2>
        <form onSubmit={handleSubmit} className="signlog-form">
          <input
            // on change permet de récupérer les données tapées par le user
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
          />
          <div className="form-error">{errorMessage1}</div>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            placeholder="Email"
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
          <div className="newsletter-container">
            <div>
              <input className="check" type="checkbox" />
              <span>S'inscire à notre newsletter</span>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes et
              conditions ainsi que la Politique de Confidentialité de Vinted. Je
              confirme avoir au moins 18 ans.
            </p>
            <button
              className={
                username && email && password && confirmation === password
                  ? "validate-button"
                  : "unvalidate-button"
              }
              disabled={isLoading ? true : false}
              type="submit"
            >
              {isLoading ? "Inscription en cours" : "S'inscrire"}{" "}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
