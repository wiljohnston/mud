import React from "react";

// eslint-disable-next-line react/prop-types
const Filterer = ({ className, type = `grayscale`, value = 1, children }) => (
  <div
    className={`transition-filter--slow ${className}`}
    style={{ filter: `${type}(${value})` }}
  >
    {children}
  </div>
);

export default Filterer;
