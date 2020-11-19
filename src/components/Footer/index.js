import React from "react";
import "./index.css";
import Reactlogo from "../../images/react-icon.png";

const Footer = (props) => {
  return (
    <div className="footer">
      <p>
        Made with React at Le Reacteur by Romain Catry{" "}
        <img className="react-logo" src={Reactlogo} alt="react-logo" />
      </p>
    </div>
  );
};

export default Footer;
