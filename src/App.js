import React from "react";
import "./App.scss";
import "../src/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import pokedex from "./images/poke.png";
import pikachu from "./images/pikachu.png";

export const App = () => {
  return (
    <div className="login">
      <div className="login-modal">
        <div className="col-6 login-modal__left center title">
          <div className="login-modal__form">
            <span>Sign in</span>
            <input
              placeholder="youremail@gmail.com"
              className="login-modal__input mt-5"
              type="text"
            />
            <input
              placeholder="Password"
              type="password"
              className="login-modal__input mt-4"
            />
            <button type="submit" className="login-modal__btn mt-4">
              SIGN IN
            </button>
          </div>
        </div>
        <div className="col-6 login-modal__right center text">
          <div className="login-modal__form title">
            <span>Hello, Master!</span>
            <div className="login-modal__subtitle">
              <p>Are you ready to catch some Pokémons today ?</p>
            </div>
          </div>
          <img className="pikachu" src={pikachu} alt="" />
        </div>
      </div>
      <img className="pokedex-logo" src={pokedex} alt="pokedex-logo" />
      <p className="credits">⌨️ con ❤️ por Nicola Di Candia</p>
    </div>
  );
};

export default App;
