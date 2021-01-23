/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { DocumentContext } from "~context/DocumentContext";

const AppearOnScroll = ({ atTop, children, once, onFirstSight, delay = 2 }) => {
  const documentContext = useContext(DocumentContext);
  const containerRef = useRef();
  const [visible, setVisible] = useState(false);
  const [seen, setSeen] = useState(false);
  const { scrollTop, windowHeight } = documentContext;

  useEffect(() => {
    if (!atTop || !containerRef?.current || typeof window === `undefined`) {
      return;
    }

    window.scrollTo(0, 1);
  }, [containerRef.current]);

  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }

    const { height, top } = containerRef.current.getBoundingClientRect();

    if (top > -height && top < windowHeight) {
      if (!visible) {
        setVisible(true);
        if (!seen) {
          onFirstSight();
          setSeen(true);
        }
      }
    } else if (visible && !once) {
      setVisible(false);
    }
  }, [scrollTop]);

  //

  let computedChildren = children;

  if (typeof children === `function`) {
    computedChildren = children({ visible });
  }

  //

  return (
    <div
      ref={containerRef}
      className={`${
        visible ? `animation-appear` : `invisible`
      } animation-delay-${delay}`}
    >
      {computedChildren}
    </div>
  );
};

AppearOnScroll.defaultProps = {
  atTop: false,
  once: false,
  onFirstSight: () => {}
};

AppearOnScroll.propTypes = {
  atTop: PropTypes.bool,
  onFirstSight: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  once: PropTypes.bool
};

export default AppearOnScroll;
