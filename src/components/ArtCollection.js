/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import Img from "gatsby-image";
import LottieAnimation from "~components/LottieAnimation";
import ImageCollage from "~components/ImageCollage";
import AppearOnScroll from "~components/AppearOnScroll";

const ArtCollection = ({ className, items }) => {
  const [numAnimationsLoaded, setNumAnimationsLoaded] = useState(0);
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  const [animationsPlayingNow, setAnimationsPlayingNow] = useState({});

  const numAnimationsToLoad = items.filter(({ type }) => type === `animation`)
    .length;

  useEffect(() => {
    if (numAnimationsLoaded === numAnimationsToLoad) {
      setReadyToDisplay(true);
    }
  }, [numAnimationsLoaded]);

  return (
    <ul
      className={`${className || `transition-opacity`} ${
        readyToDisplay ? `opacity-100` : `opacity-0`
      }`}
    >
      {items.map((item, itemIndex) => {
        const key = `art-collection-item_${itemIndex}`;
        let itemJSX;

        switch (item.type) {
          case `Raster image`:
            itemJSX = (
              <Img
                fluid={item.rasterImage.childImageSharp.fluid}
                className="w-full relative block"
              />
            );
            break;

          case `Scalar image`:
            itemJSX = (
              <img
                src={item.vectorImage.publicURL}
                className="w-full relative block"
                alt={item.type}
              />
            );
            break;

          case `animation`:
            itemJSX = (
              <>
                <LottieAnimation
                  animationPublicURL={item.animation.publicURL}
                  doLoad
                  doPlay={animationsPlayingNow[item.itemID]}
                  animationOptions={{ loop: true }}
                  loadedCallback={() => {
                    setNumAnimationsLoaded(oldNum => oldNum + 1); // keep track of how many animations we've loaded
                  }}
                  id={item.itemID}
                  className="w-full relative block"
                />
              </>
            );
            break;

          case `collage`:
            itemJSX = (
              <ImageCollage
                className="w-full relative block"
                gatsbyImages={item.collageImages.map(({ image }) => image)}
              />
            );
            break;

          case `html`:
            // eslint-disable-next-line react/no-danger
            itemJSX = <div dangerouslySetInnerHTML={{ __html: item.html }} />;
            break;

          default:
            break;
        }
        return (
          <li className="w-full grid" key={key}>
            <div
              className={`grid-end-${item.width} grid-start-${
                item.alignment
              } ${item.className || ``}`}
            >
              {item.appearOnScroll ? (
                <AppearOnScroll
                  once
                  atTop={itemIndex === 0}
                  onFirstSight={
                    // if it's an animation, and it's appears on scroll, then start playing when it appears
                    item.type === `animation`
                      ? () => {
                          setAnimationsPlayingNow(prevObj => ({
                            ...prevObj,
                            [item.itemID]: true
                          }));
                        }
                      : () => {}
                  }
                >
                  {itemJSX}
                </AppearOnScroll>
              ) : (
                itemJSX
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ArtCollection;
