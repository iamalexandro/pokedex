import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Loader from "../Loader";

//styles
import "./styles/Login.scss";
import "../index.scss";

//sources
import pokedex from "../images/pokedex.png";
import pikachu from "../images/pikachu.png";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (validateToken()) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
    return () => {};
  }, [navigate]);

  const validateToken = () => {
    const token = sessionStorage.getItem("token");
    return token;
  };

  const validaterUser = async (email, password) => {
    setLoading(true);
    const res = await axios.get("users.json");
    const data = res.data.users;
    const user = await data.find((user) => user.email === email);
    const passwordValidated = await data.find(
      (user) => user.password === password
    );

    setTimeout(() => {
      setLoading(false);
    }, "500");

    if (!user) {
      Swal.fire("User not found 🤔");
    } else if (user && !passwordValidated) {
      Swal.fire({
        icon: "error",
        title: "Oops... 🤒",
        text: "Wrong Password!",
      });
    } else if (user && passwordValidated) {
      const token = user.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("name", user.name);
      sessionStorage.setItem("email", user.email);
      sessionStorage.setItem("level", user.level);
      sessionStorage.setItem("avatar", user.avatar);
      Swal.fire({
        icon: "success",
        title: "Loggin Succesfull ✅ 🥰",
        showConfirmButton: false,
        timer: 1000,
      });
      navigate("/dashboard");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validaterUser(email, password);
  };

  return (
    <div className="login">
      <div className="login-modal">
        <div className="w-1/2 login-modal__left center title w-full">
          <div className="login-modal__form">
            <span>Sign in</span>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                className="login-modal__input mt-5"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                className="login-modal__input mt-4"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className="login-modal__checkbox">
                <input
                  type="checkbox"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mt-4"
                />
                <span
                  style={{
                    fontSize: "15px",
                    fontWeight: "600",
                    marginLeft: "1rem",
                  }}>
                  Show Password
                </span>
              </div>
              {loading ? (
                <div>
                  <Loader></Loader>
                </div>
              ) : (
                <button type="submit" className="own-btn own-btn__hover mt-2">
                  SIGN IN
                </button>
              )}
            </form>
          </div>
        </div>
        <div className="w-1/2 login-modal__right center text">
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
