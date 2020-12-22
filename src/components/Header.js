/* eslint-disable react/prop-types */

import React from "react";
import { Link } from "gatsby";

const Header = () => {
  return (
    <header className="header transition-transform w-full fixed top-0 right-0 left-0 z-30 py-2">
      <nav className="grid px-4">
        <div className="grid-end-12 flex items-center justify-start">
          <Link to="/" className="header__menu relative f5">
            m
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
