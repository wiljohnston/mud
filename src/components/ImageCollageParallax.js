/* eslint-disable react/prop-types */

import React, { useContext, useState } from "react";
import Img from "gatsby-image";
import { DocumentContext } from "~context/DocumentContext";

const ImageCollageBuild = ({ gatsbyImages, className, severity = 0.02 }) => {
  const { scrollTop } = useContext(DocumentContext);

  const [multipliers] = useState(
    new Array(gatsbyImages.length).fill(0).map(() => {
      return Math.random() * severity;
    })
  );

  return (
    <div className={`${className} overflow-hidden`}>
      <article className="relative">
        {gatsbyImages.map(({ childImageSharp }, imageIndex) => {
          return (
            <figure
              className={`transition-transform ${
                imageIndex === 0
                  ? `w-full relative block`
                  : `absolute w-full h-full top-0 right-0 bottom-0 left-0"`
              }`}
              style={{
                transform: `translate(0px, ${multipliers[imageIndex] *
                  scrollTop}px)`,
              }}
            >
              <Img
                fluid={childImageSharp.fluid}
                className="w-full relative block"
                loading="eager"
              />
            </figure>
          );
        })}
      </article>
    </div>
  );
};

export default ImageCollageBuild;
