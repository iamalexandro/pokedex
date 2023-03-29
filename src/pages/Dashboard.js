import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import Swal from "sweetalert2";
import Loader from "../Loader";
import Nav from "../components/Nav";
import Card from "../components/Card";

//styles
import "../index.scss";
import "./styles/Dashboard.scss";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    validateToken();
  }, [navigate]);

  useEffect(() => {
    bringPokemons(page);
    handlePageChange(page);
    return () => {};
  }, [page]);

  const validateToken = () => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const bringPokemons = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${
          page === 1 ? 0 : page * 10 - 10
        }`
      );
      const results = res.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );
      setLoading(false);
      setPokemonList(pokemonData);
    } catch (error) {
      console.log(error);
    }
  };

  const cleanActivePageButton = () => {
    let activeBtn = document.querySelector(".btn-pag__active");
    activeBtn.classList.remove("btn-pag__active");
  };

  const handlePageChange = (page) => {
    cleanActivePageButton();
    let btnToActive =
      document.querySelector(".pagination").childNodes[page - 1];
    btnToActive.classList.add("btn-pag__active");
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="dashboard">
      <Nav />
      {/* cards  */}
      <div className="cards flex flex-wrap m-auto p-6 justify-center">
        {loading ? (
          <div className="mb-4">
            <Loader />
          </div>
        ) : (
          pokemonList.map((pokemon) => (
            <Card
              name={pokemon.name}
              weight={pokemon.weight}
              img={pokemon.sprites.other.dream_world.front_default}
              move={pokemon.moves[0].move.name}
              move2={pokemon.moves[1] ? pokemon.moves[1].move.name : ""}
              statName={pokemon.stats[0].stat.name}
              statBase={pokemon.stats[0].base_stat}
            />
          ))
        )}

        {/* Pagination */}
        <div className="pagination flex w-full h-8 justify-center">
          <button
            className="btn-pag btn-pag--first btn-pag__active"
            onClick={() => setPage(1)}>
            1
          </button>
          <button className="btn-pag" onClick={() => setPage(2)}>
            2
          </button>
          <button className="btn-pag" onClick={() => setPage(3)}>
            3
          </button>
          <button className="btn-pag" onClick={() => setPage(4)}>
            4
          </button>
          <button className="btn-pag" onClick={() => setPage(5)}>
            5
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
