import React from "react";
import Swal from "sweetalert2";

//styles
import "./styles/Card.scss";

export const Card = (pokemon) => {
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
          <p id="main-move"style="margin:.3rem">Main move: <b>${move}</b></p></div>
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
    <div
      className="card w-full md:w-2/4 lg:w-1/3  mx-2 h-96 bg-gray-300"
      onClick={() =>
        showPokemonInfo(
          pokemon.name,
          pokemon.weight,
          pokemon.img,
          pokemon.move,
          pokemon.statName,
          pokemon.statBase
        )
      }>
      <div
        className="card__image w-25 h-full relative"
        style={{
          backgroundImage: `url("${pokemon.img}")`,
        }}>
        <p className="card__name text-white font-bold absolute text-2xl">
          weight {pokemon.weight}
        </p>
      </div>
      <div className="card__info w-full h-32 p-5">
        <p className="font-bold text-4xl text-slate-600">{pokemon.name}</p>
        <div className="flex">
          <p className="text-md mt-4 text-slate-600">👊🏻 {pokemon.move}</p>
          <p className="text-md mt-4 ml-5 text-slate-600">{pokemon.move2}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
