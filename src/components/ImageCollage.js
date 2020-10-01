/* eslint-disable react/prop-types */

import React from "react";
import Img from "gatsby-image";

const ImageCollage = ({ gatsbyImages, className }) => {
  return (
    <div className={className}>
      <article className="relative">
        {gatsbyImages.map(({ childImageSharp }) => {
          return (
            <figure className="absolute top-0 right-0 bottom-0 left-0">
              <Img
                fluid={childImageSharp.fluid}
                className="w-full relative block"
              />
            </figure>
          );
        })}
      </article>
    </div>
  );
};

export default ImageCollage;
