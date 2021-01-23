/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql } from "gatsby";
import Layout from "~components/Layout";
import SEO from "~components/SEO";
import ArtCollection from "~components/ArtCollection";

const GalleryPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  console.log(`frontmatter`, frontmatter);

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="contact-page w-full relative bg-paper">
        <ArtCollection
          className="w-full relative block"
          items={frontmatter.items}
        />
      </Layout>
    </>
  );
};

export default GalleryPage;

export const query = graphql`
  query GalleryPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
        items {
          type
          id
          title
          width
          alignment
          rasterImage {
            childImageSharp {
              fluid(maxWidth: 768) {
                ...GatsbyImageSharpFluid_withWebp_noBase64
                src
              }
            }
          }
          videos {
            video {
              publicURL
            }
            playOnceThenRemove
            playAfterPreviousFinishes
            id
            loop
          }
          vectorImage {
            publicURL
          }
          animation {
            publicURL
          }
          appearOnScroll
          appearOnScrollDelay
          collageEffect
          className
          itemID
          html
          collageImages {
            image {
              childImageSharp {
                fluid(maxWidth: 768) {
                  ...GatsbyImageSharpFluid_withWebp_noBase64
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
