import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../Loader";

//styles
import "../index.scss";
import "./styles/Dashboard.scss";

//images
import Nav from "../components/Nav";

export const Dashboard = () => {
  const navigate = useNavigate();

  const [pokemonList, setPokemonList] = useState([]);
  const [page, setPage] = useState(1);
  const [pokemonSelected, setPokemonSelected] = useState();
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

  const showPokemonInfo = (name, weight, img, move, powerName, power) => {
    Swal.fire({
      title: `<b>${name}</b>`,
      confirmButtonColor: "#ff2b4e",
      confirmButtonText: "Close",
      text: `Weight: ${weight}`,
      html: `<div style="display: flex;align-items: center;flex-direction: column;">
          <div class="first" style="display:flex; align-items: center;">
          <div style="width:3rem;height:1rem;background:#ffa400;border-radius:20px"></div>
          <p style="margin:.3rem">Weigth: <b>${weight}</b></p></div>
          <div class="first" style="display:flex;align-items: center;">
          <div style="width:1.5rem;height:1rem;background:#3ef60a;border-radius:20px;"></div>
          <p style="margin:.3rem">Main move: <b>${move}</b></p></div>
          <div class="first" style="display:flex; align-items: center;">
          <div style="width:2rem;height:1rem;background:#00baff;border-radius:20px"></div>
          <p style="margin:.3rem">Main stat: <b>${powerName}</b></p></div>
          <div class="first" style="display:flex; align-items: center;">
          <div style="width:2rem;height:1rem;background:#f27474;border-radius:20px"></div>
          <p style="margin:.3rem">Stat power: <b>${power}</b></p></div></div>`,
      imageUrl: img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Pokemon image",
      backdrop: `rgba(0, 0, 0, 0.8)`,
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
          pokemonList.map((p) => (
            // Card
            <div
              className="card w-full md:w-2/4 lg:w-1/3  mx-2 h-96 bg-gray-300"
              onClick={() =>
                showPokemonInfo(
                  p.name,
                  p.weight,
                  p.sprites.other.dream_world.front_default,
                  p.moves[0].move.name,
                  p.stats[0].stat.name,
                  p.stats[0].base_stat
                )
              }>
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
