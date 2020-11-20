/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import Img from "gatsby-image";

const ImageCollageBuild = ({
  gatsbyImages,
  className,
  movementInterval = 150,
  craziness = 0.7,
  evolveFactor = 0.7,
  initialDistance = 50,
  stopAt = null // set this to like 0.01 if you want it to eventually stop
}) => {
  const [offsets, setOffsets] = useState(
    new Array(gatsbyImages.length).fill(0).map(() => {
      const x = (Math.random() * 2 - 1) * initialDistance;
      const y = (Math.random() * 2 - 1) * initialDistance;
      return { x, y };
    })
  );

  const [ourInterval, setOurInterval] = useState(null);

  const clearOurInterval = () => {
    if (ourInterval) {
      clearInterval(ourInterval);
      setOurInterval(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOffsets(oldOffsets => {
        const newOffsets = oldOffsets.map(({ x: oldX, y: oldY }) => {
          const newX =
            oldX * evolveFactor + (Math.random() * 2 - 1) * craziness;

          const newY =
            oldY * evolveFactor + (Math.random() * 2 - 1) * craziness;

          return { x: newX, y: newY };
        });
        return newOffsets;
      });
    }, movementInterval);

    setOurInterval(interval);

    return () => clearOurInterval();
  }, []);

  if (stopAt) {
    useEffect(() => {
      const averageOffset = offsets.reduce(
        (average, { x, y }) => (average + (x + y)) / 2 / offsets.length,
        0
      );
      if (averageOffset < stopAt && averageOffset > -stopAt) {
        clearOurInterval();
      }
    }, [offsets]);
  }

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
                transform: `translate(${offsets[imageIndex].x}px, ${offsets[imageIndex].y}px)`
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

export default ImageCollageBuild;
