import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

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

  const [pokemonList, setPokemonList] = useState([]);
  // const [page, setPage] = useState();

  useEffect(() => {
    validateToken();
    return () => {};
  }, []);

  useEffect(() => {
    bringPokemons();
    return () => {};
  }, []);

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
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (page) => {};

  return (
    <div>
      {/* /navbar */}
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

      {/* Cards  */}
      <div className="cards flex flex-wrap container m-auto p-6 justify-center">
        {pokemonList.map((p) => (
          <div className="card w-full md:w-2/4 lg:w-1/3  mx-2 h-96 bg-gray-300">
            <div
              className="card__image w-25 h-full relative"
              style={{
                backgroundImage: `url("${p.sprites.other.dream_world.front_default}")`,
              }}>
              <p className="card__name text-white font-bold absolute text-2xl">
                weight {p.weight}
              </p>
            </div>
            <div className="card__info w-full h-32 p-5">
              <p className="font-bold text-4xl text-slate-600">{p.name}</p>
              <div className="flex">
                <p className="text-md mt-4 text-slate-600">
                  👊🏻 {p.moves[0].move.name.replace("-", " ")}
                </p>
                <p className="text-md mt-4 ml-5 text-slate-600">
                  {p.moves[1] ? p.moves[1].move.name : ""}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <a
              href="#"
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </a>
            <a
              href="#"
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </a>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">10</span> of{" "}
                <span className="font-medium">50</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Previous</span>
                  <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                </a>
                {/* current = "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" */}
                {/* disable = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex" */}

                <button
                  onClick={handlePage(1)}
                  className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  1
                </button>
                <button
                  onClick={handlePage(2)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  2
                </button>
                <a
                  href="#"
                  aria-current="page"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  3
                </a>
                <a
                  href="#"
                  className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                  4
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  5
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span className="sr-only">Next</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
