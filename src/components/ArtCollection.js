/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { unmountComponentAtNode } from "react-dom";
import Img from "gatsby-image";
import LottieAnimation from "~components/LottieAnimation";
import ImageCollage from "~components/ImageCollage";
import AppearOnScroll from "~components/AppearOnScroll";
import Video from "~components/Video";

const ArtCollection = ({ className, items }) => {
  const [readyToDisplay, setReadyToDisplay] = useState(false);
  const [videosPlayingNow, setVideosPlayingNow] = useState({});

  const toCallOnceLoaded = [];

  useEffect(() => {
    let listener;

    if (typeof window !== `undefined`) {
      listener = window.addEventListener(`load`, () => {
        setReadyToDisplay(true);
        toCallOnceLoaded.forEach(func => func());
      });
    }

    return () => {
      if (listener !== undefined) {
        window.removeEventListener(listener);
      }
    };
  }, []);

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
                  animationOptions={{ loop: true }}
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

          case `Video set`:
            itemJSX = (
              <figure className="w-full relative block">
                {item.videos.map((videoData, videoIndex) => {
                  const { playOnceThenRemove, id, video } = videoData;

                  const onEnded = () => {
                    if (typeof document !== `undefined` && playOnceThenRemove) {
                      unmountComponentAtNode(document.getElementById(id)); // this doesnt work, doesnt quite matter but should fix
                    }

                    // if the next video has the playAfterPreviousFinishes property, then trigger that in this callback
                    const nextVideo = item.videos[videoIndex + 1];
                    if (nextVideo?.playAfterPreviousFinishes) {
                      setVideosPlayingNow(oldState => ({
                        ...oldState,
                        [nextVideo.id]: true
                      }));
                    }
                  };

                  return (
                    <Video
                      key={id}
                      loop={!playOnceThenRemove}
                      onEnded={onEnded}
                      playing={!!videosPlayingNow[id]}
                      id={id}
                      autoPlay={false}
                      className={`w-full ${
                        videoIndex === 0
                          ? `relative block`
                          : `absolute top-0 right-0 bottom-0 left-0`
                      } ${videosPlayingNow[id] ? `visible` : `hidden`}`}
                      src={video.publicURL}
                    />
                  );
                })}
              </figure>
            );
            break;

          case `html`:
            // eslint-disable-next-line react/no-danger
            itemJSX = <div dangerouslySetInnerHTML={{ __html: item.html }} />;
            break;

          default:
            break;
        }

        // only called if it's a video set
        const startPlayingTheseVideos = () => {
          setVideosPlayingNow(prevObj => ({
            ...prevObj,
            ...item.videos.reduce((obj, { id, playAfterPreviousFinishes }) => {
              obj[id] = !playAfterPreviousFinishes; // unless this is set, play the videos
              return obj;
            }, {})
          }));
        };

        // if not appear on scroll, play them as soon as they're loaded
        if (!item.appearOnScroll && item.type === `Video set`) {
          toCallOnceLoaded.push(startPlayingTheseVideos);
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
                    item.type === `Video set`
                      ? startPlayingTheseVideos
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
