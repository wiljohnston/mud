/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Img from "gatsby-image";

const ImageCollage = ({
  gatsbyImages,
  className,
  movementInterval = 150,
  craziness = 4,
  evolveFactor = 0.92
}) => {
  const [offsets, setOffsets] = useState(
    new Array(gatsbyImages.length).fill(0)
  );

  // update crazy state any time new prop comes in
  const [crazyState, setCrazyState] = useState(null);
  useEffect(() => setCrazyState(craziness), [craziness]);

  let interval;

  useEffect(() => {
    interval = setInterval(() => {
      setOffsets(oldOffsets => {
        const newOffsets = oldOffsets.map(() => {
          const newNum = (Math.random() * 2 - 1) * crazyState;
          return newNum;
        });
        return newOffsets;
      });

      // if we want the craziness to explode or diminish, alter the craziness accordingly each interval
      if (evolveFactor) {
        setCrazyState(oldCrazyState => oldCrazyState * evolveFactor);
      }
    }, movementInterval);

    return () => (interval ? clearInterval(interval) : null);
  }, [crazyState]);

  useEffect(() => {
    if (crazyState < 0.1 && interval) {
      clearInterval(interval);
    }
  }, [crazyState]);

  return (
    <div className={className}>
      <article className="relative">
        {gatsbyImages.map(({ childImageSharp }, imageIndex) => {
          return (
            <figure
              className={
                imageIndex === 0
                  ? `w-full relative block`
                  : `absolute w-full h-full top-0 right-0 bottom-0 left-0"`
              }
              style={{
                transform: `translate(${offsets[imageIndex]}px, ${offsets[imageIndex]}px)`
              }}
            >
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
