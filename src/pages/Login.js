import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";
import Swal from "sweetalert2";
import Loader from "../Loader";

//styles
import "./styles/Login.scss";
import "../index.scss";
import "bootstrap/dist/css/bootstrap.min.css";

//sources
import pokedex from "../images/poke.png";
import pikachu from "../images/pikachu.png";

export const Login = () => {
  // let loading = false;
  const navigate = useNavigate();
  useEffect(() => {
    if (validateToken()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    return () => {};
  }, [navigate]);

  const validateToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validaterUser = async (username, password) => {
    setLoading(true);

    const user = await users.find((user) => user.username === username);
    const passwordValidated = await users.find(
      (user) => user.password === password
    );

    setTimeout(() => {
      setLoading(false);
    }, "500");

    if (!user) {
      setTimeout(() => {
        Swal.fire("User not found 🤔");
      }, 500);
    } else if (user && !passwordValidated) {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops... 🤒",
          text: "Wrong Password!",
        });
      }, 500);
    } else if (user && passwordValidated) {
      const token = user.token;
      localStorage.setItem("token", token);
      localStorage.setItem("firstLoggin", true);
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validaterUser(username, password);
  };

  return (
    <div className="login">
      <div className="login-modal">
        <div className="col-6 login-modal__left center title">
          <div className="login-modal__form">
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="login-modal__input mt-5"
                onChange={(e) => setUsername(e.target.value)}
                // onChange={(e) => console.log(e.target.value)}
                value={username}
              />
              <input
                placeholder="Password"
                type="password"
                className="login-modal__input mt-4"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {loading ? (
                <div>
                  <Loader></Loader>
                </div>
              ) : (
                <button type="submit" className="login-modal__btn mt-5">
                  SIGN IN
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="col-6 login-modal__right center text">
          <div className="login-modal__form title">
            <span>Hello, Master!</span>
            <div className="login-modal__subtitle">
              <p>Are you ready to catch some Pokémons today ?</p>
            </div>
          </div>
          <img className="pikachu" src={pikachu} alt="" width="70%" />
        </div>
      </div>
      <img
        className="pokedex-logo"
        src={pokedex}
        alt="pokedex-logo"
        width="10%"
      />
      <p className="credits">⌨️ con ❤️ por Nicola Di Candia</p>
    </div>
  );
};

export default Login;
