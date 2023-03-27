import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//styles
import "../index.scss";
import "./styles/Dashboard.scss";

//images
import pokeball from "../images/pokeball.png";

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

  const [pokemon, setPokemon] = useState({
    name: "",
    photo: "",
    moves: [],
    weight: "",
  });

  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    validateToken();
    return () => {};
  }, []);

  useEffect(() => {
    bringPokemons();
    return () => {};
  }, []);

  useEffect(() => {}, [pokemonList]);

  const bringPokemons = async () => {
    try {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"
      );
      const results = res.data.results;
      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const res = await axios.get(pokemon.url);
          return res.data;
        })
      );

      setPokemonList(pokemonData);
      // addPokemonsToList(pokemonListFetch);
    } catch (error) {
      // console.log(error);
    }
  };

  const addPokemonsToList = async (pokemonListFetch) => {
    let pokemonData = [];
    try {
      pokemonListFetch.map(async (p) => {
        const res = await axios.get(p.url);
        console.log(p);

        const move1 = res.data.moves[0].move.name;
        const move2 = res.data.moves[1] ? res.data.moves[1].move.name : null;

        const pokemon = {
          name: res.data.name,
          photo: res.data.sprites.front_default,
          moves: [move1, move2],
          weight: res.data.weight,
        };
        // console.log(pokemon);
        pokemonData.push(pokemon);
      });
      console.log(pokemonData);
      setPokemonList(pokemonData);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <nav className="bg-gray-300 py-3 shadow-md">
        <div className="flex justify-between mx-6">
          <div className="flex w-60">
            <img
              className="pokeball"
              src={pokeball}
              alt="icon"
              style={{ width: "3rem" }}
            />
            <p className="my-auto ml-4 font-bold text-xl">Pokedex</p>
          </div>
          <div className="my-auto">
            <button className="own-btn" onClick={logOut}>
              Log out
            </button>
          </div>
        </div>
      </nav>
      {/* card */}
      <div className="cards flex container m-auto p-6 justify-center">
        {pokemonList.map((p) => {
          // console.log("name", p.name);
          // console.log(p.weight);
          // console.log(p.photo);
          <div className="card w-full md:w-2/4 lg:w-1/3  mx-2 h-96 bg-gray-300">
            <div
              className="card__image w-25 h-full relative"
              style={
                {
                  // backgroundImage: `url("${p.photo}")`,
                }
              }>
              <p className="card__name text-white font-bold absolute text-2xl">
                {/* weight {p.weight} */}
              </p>
            </div>
            <div className="card__info w-full h-32 p-5">
              <p className="font-bold text-4xl text-slate-600">{p.name}</p>
              <div className="flex">
                <p className="text-md mt-4 text-slate-600">
                  {/* {pokemon.moves[0]} */}
                </p>
                <p className="text-md mt-4 ml-3 text-slate-600">
                  {/* {pokemon.moves[1] ? pokemon.moves[1] : ""} */}
                </p>
              </div>
            </div>
          </div>;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
