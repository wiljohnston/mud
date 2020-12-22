/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React, { useContext, useState } from "react";
import { graphql, Link } from "gatsby";
import { DocumentContext } from "~context/DocumentContext";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

const IndexPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;
  const { device } = useContext(DocumentContext);
  const [hovering, setHovering] = useState(null);

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="index-page w-full relative bg-paper">
        <section
          className="grid f3 items-center"
          style={{ paddingTop: device === `mobile` ? `30vh` : `0` }}
        >
          <h1 className="grid-end-12 text-center v1 pointer-events-none animation-appear">
            {frontmatter.title}
          </h1>

          <nav className="grid-end-10 xs:grid-end-11 grid-start-3 xs:grid-start-2 flex flex-col">
            <button
              onMouseEnter={() => setHovering(`line-art`)}
              onMouseLeave={() => setHovering(null)}
              type="button"
              style={{ width: `fit-content` }}
              className="cursor-pointer mr-20 animation-appear animation-delay-1"
            >
              <Link
                style={{
                  opacity:
                    hovering !== `line-art` && hovering !== null ? 0.4 : 1
                }}
                className={`transition-opacity--slow ${
                  device === `mobile` ? `f5` : `f2`
                }`}
                to="/line-art"
              >
                {`> `}line art
              </Link>
            </button>

            <button
              onMouseEnter={() => setHovering(`collage`)}
              onMouseLeave={() => setHovering(null)}
              type="button"
              style={{ width: `fit-content` }}
              className="cursor-pointer animation-appear animation-delay-2"
            >
              <Link
                style={{
                  opacity: hovering !== `collage` && hovering !== null ? 0.4 : 1
                }}
                className={`transition-opacity--slow ${
                  device === `mobile` ? `f5` : `f2`
                }`}
                to="/collage"
              >
                {`> `}collage
              </Link>
            </button>
          </nav>
        </section>
      </Layout>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
      }
    }
  }
`;
