/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { AppContext } from "~context/AppContext";

const Header = () => {
  const { menuActive, setMenuActive } = useContext(AppContext);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <header
      className={`header ${
        menuActive ? ` menu-active` : ``
      } transition-transform w-full fixed top-0 right-0 left-0 z-30 py-2`}
    >
      <nav className="grid px-4">
        <div className="grid-end-12 flex items-center justify-start">
          <button
            type="button"
            className="header__menu relative f5"
            onClick={toggleMenu}
          >
            m
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
