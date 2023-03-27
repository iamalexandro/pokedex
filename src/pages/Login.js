import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users";
import Swal from "sweetalert2";
import Loader from "../Loader";

//styles
import "./styles/Login.scss";
import "../index.scss";
// import "bootstrap/dist/css/bootstrap.min.css";

//sources
import pokedex from "../images/pokedex.png";
import pikachu from "../images/pikachu.png";

export const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
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
    const token = localStorage.getItem("token");
    return token;
  };

  const validaterUser = async (username, password) => {
    setLoading(true);
    const user = await users.find((user) => user.username === username);
    const passwordValidated = await users.find(
      (user) => user.password === password
    );

    setTimeout(() => {
      setLoading(false);
    }, "500");

    setTimeout(() => {
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
        localStorage.setItem("token", token);
        Swal.fire({
          icon: "success",
          title: "Loggin Succesfull ✅ 🥰",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/dashboard");
      }
    }, 500);
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
                value={username}
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
                <button type="submit" className="own-btn mt-2">
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
