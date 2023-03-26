import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";

export const Dashboard = () => {
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

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    validateToken();
    return () => {};
  }, []);

  // pokedex conection

  // const bringPokemons = () => {
  //   axios({
  //     method: "get",
  //     url: "https://pokeapi.co/api/v2/pokemon/ditto",
  //   }).then(function (response) {
  //     console.log(response);
  //   });
  // };

  return (
    <div style={{ margin: "2rem" }}>
      <h2>Dashboard</h2>
      <div style={{ marginTop: "1rem" }}>
        <button onClick={logOut}>Log out</button>
      </div>
    </div>
  );
};

export default Dashboard;
