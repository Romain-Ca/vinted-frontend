import React from "react";
import "./index.css";

const PublishDetails = ({
  handleSubmit,
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  condition,
  setCondition,
  city,
  setCity,
  brand,
  setBrand,
  size,
  setSize,
  color,
  setColor,
  file,
  setFile,
}) => {
  return (
    <div className="publish-main">
      <div className="publish-container">
        <h2>Vends ton article</h2>
        <form onSubmit={handleSubmit} className="publish-form">
          <div className="file-container">
            <div className="without-file hidden">
              <div className="input-design">
                <input
                  //   multiple = {true} -- A creuser
                  type="file"
                  id="file"
                  name="file"
                  required
                  accept="image/png , image/jpeg"
                  onChange={(event) => {
                    setFile(event.target.files[0]);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="text-input-container">
            <div className="text-input">
              <p>Titre</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex : Pantalon rouge Zara"
                required
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <p>Décris ton article</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: taille correctement, porté à une soirée"
                required
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="text-input-container">
            <div className="text-input">
              <p>Marque</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: Nike"
                required
                value={brand}
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <p>Taille</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: S / 40 / 10"
                required
                value={size}
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <p>Couleur</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: Rouge"
                required
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <p>Etat</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: Neuf avec étiquette"
                required
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="text-input">
              <p>Lieu</p>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="ex: Toulouse"
                required
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="text-input-container">
            <div className="text-input">
              <p>Prix</p>
              <div className="checkbox-input-container">
                <input
                  className="input-price"
                  type="text"
                  id="text"
                  name="text"
                  placeholder="ex: 50"
                  required
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div className="checkbox-interested">
                  <input type="checkbox" />
                  <span>Je suis intéressé(e) par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="button-container">
            <button
              className={
                title &&
                description &&
                price &&
                condition &&
                city &&
                brand &&
                size &&
                color &&
                file
                  ? "add-button"
                  : "unvalidate-add-button"
              }
              type="submit"
            >
              Ajouter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublishDetails;
