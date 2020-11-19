import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookie from "js-cookie";

// Import containers
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Publish from "./containers/Publish";
import Paiement from "./containers/Paiement";

function App() {
  // On met dans App.js tout ce qui concerne l'authentification
  // Donc Cookie du token etc...
  const [token, setToken] = useState(Cookie.get("userToken") || null);

  const setUser = (tokenReceived) => {
    if (tokenReceived) {
      // Si token received on crée un cookie
      // Ps : on reçoit le cookie suite à la requête Axios dans Login ou Signup
      Cookie.set("userToken", tokenReceived, { expires: 365 });
      // via la fonction setToken token dans le state = tokenReceived
      setToken(tokenReceived);
    } else {
      // si pas de token received alors:
      // suppression du Cookie
      Cookie.remove("userToken");
      // Et on repasse le token à null
      setToken(null);
    }
  };

  return (
    <Router>
      <Header token={token} setUser={setUser} />
      <Switch>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/publish">
          <Publish token={token} />
        </Route>
        <Route path="/paiement">
          <Paiement token={token} />
        </Route>
        <Route path="/">
          <Home token={token} />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
