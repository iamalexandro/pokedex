import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import pokeball from "../images/pokeball.png";

import "./styles/Nav.scss";

export const Nav = () => {
  const navigate = useNavigate();

  const [menuOpen, setOpenMenu] = useState(false);

  const logOut = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const handleUserMenu = () => {
    console.log("hola");
  };

  const handleUserInfo = () => {
    Swal.fire({
      title: `<b>Nombre de usuario</b>`,
      confirmButtonColor: "#ff2b4e",
      confirmButtonText: "Close",
      html: `hola soy el contenido del usuario`,
      // imageUrl: img,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Pokemon image",
      backdrop: `rgba(0, 0, 0, 0.8)`,
    });
  };

  return (
    <div>
      <nav className="navbar bg-gray-300 py-3 shadow-md">
        <div className="flex justify-between mx-6">
          <div className="flex w-50">
            <img
              className="pokeball"
              src={pokeball}
              alt="icon"
              style={{ width: "3rem" }}
            />
            <p className="my-auto ml-4 font-bold text-xl">Pokedex</p>
          </div>
          <div className="flex self-center">
            {/* User Menu */}
            <button
              onClick={handleUserMenu}
              className="navbar__btn my-auto"
              style={{ backgroundImage: `url("#")` }}></button>

            <div className="navbar__menu">
              <div className="self-center">
                <button className="own-btn h-auto">Profile</button>
              </div>
              <div className="self-center">
                <button
                  className="own-btn own-btn__logout h-auto"
                  onClick={logOut}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
