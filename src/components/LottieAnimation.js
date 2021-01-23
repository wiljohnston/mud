import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import lottieAnimationLoader from "~workers/animation.worker";

const LottieAnimation = ({
  animationPublicURL,
  animationOptions,
  className,
  completeCallback,
  loadedCallback,
  doLoad,
  doPlay,
  enterFrameCallback,
  id
}) => {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [lottieObj, setLottieObj] = useState(null);

  useEffect(() => {
    fetch(animationPublicURL)
      .then(response => response.json())
      .then(lottieJSON => {
        setAnimationData(lottieJSON);
      });
  }, []);

  useEffect(() => {
    if (doLoad && ref.current && !loaded && animationData) {
      setLoaded(true);

      animationOptions.name = id;

      lottieAnimationLoader(id, animationData, animationOptions).then(
        ([loadedAnimation, lottie]) => {
          loadedCallback();
          loadedAnimation.addEventListener(`complete`, completeCallback);
          loadedAnimation.addEventListener(`enterFrame`, enterFrameCallback);
          setLottieObj(lottie);
        }
      );
    }
  }, [doLoad, ref.current, animationData]);

  useEffect(() => {
    if (lottieObj) {
      if (doPlay) {
        // console.log(`playing ${id}`);
        lottieObj.play(id);
      } else {
        // console.log(`pausing ${id}`);
        lottieObj.pause(id);
      }
    }
  }, [doPlay, lottieObj]);

  return <div id={id} ref={ref} className={className} />;
};

LottieAnimation.defaultProps = {
  animationOptions: {},
  completeCallback: () => {},
  enterFrameCallback: () => {},
  loadedCallback: () => {},
  className: ``,
  doLoad: false,
  doPlay: false
};

LottieAnimation.propTypes = {
  animationPublicURL: PropTypes.string.isRequired,
  animationOptions: PropTypes.shape({
    name: PropTypes.string
  }),
  className: PropTypes.string,
  completeCallback: PropTypes.func,
  loadedCallback: PropTypes.func,
  doLoad: PropTypes.bool,
  doPlay: PropTypes.bool,
  enterFrameCallback: PropTypes.func,
  id: PropTypes.string.isRequired
};

export default LottieAnimation;
