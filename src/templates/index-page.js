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

  const dynamicLink = (internal, to, props, children) => {
    if (internal) {
      return (
        <Link {...props} to={to}>
          {children}
        </Link>
      );
    }

    return (
      <a href={to} {...props}>
        {children}
      </a>
    );
  };

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
            {frontmatter.links.map(({ link, text }, linkIndex) => {
              console.log(`link`, link);
              return (
                <button
                  key={`${text}_${link}`}
                  onMouseEnter={() => setHovering(linkIndex)}
                  onMouseLeave={() => setHovering(null)}
                  type="button"
                  style={{ width: `fit-content` }}
                  className="cursor-pointer animation-appear animation-delay-1"
                >
                  {dynamicLink(
                    !link.startsWith(`http`),
                    link,
                    {
                      style: {
                        opacity:
                          hovering !== linkIndex && hovering !== null ? 0.5 : 1
                      },
                      className: `transition-opacity--slow ${
                        device === `mobile` ? `f5` : `f2`
                      }`
                    },
                    text
                  )}
                  {/* <Link
                  style={{
                    opacity:
                      hovering !== linkIndex && hovering !== null ? 0.5 : 1
                  }}
                  className={`transition-opacity--slow ${
                    device === `mobile` ? `f5` : `f2`
                  }`}
                  to={link}
                >
                  {text}
                </Link> */}
                </button>
              );
            })}
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
        links {
          link
          text
        }
      }
    }
  }
`;
