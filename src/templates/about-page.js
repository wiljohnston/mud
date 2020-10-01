/* eslint-disable react/prop-types */
// import { PropTypes } from "prop-types";

import React from "react";
import { graphql } from "gatsby";
import Footer from "~components/Footer";
import Layout from "~components/Layout";
import SEO from "~components/SEO";

const AboutPage = ({ data, location }) => {
  const { frontmatter } = data.markdownRemark;

  return (
    <>
      <SEO
        customTitle={frontmatter.title}
        customDescription={frontmatter.seoDescription}
        customKeywords={frontmatter.seoKeywords}
        path={location.pathname}
      />

      <Layout className="about-page w-full relative pt-16">
        <section className="grid">
          <h1 className="grid-end-12 my-8 f3">{frontmatter.title}</h1>
        </section>
      </Layout>

      <Footer />
    </>
  );
};

export default AboutPage;

export const query = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        seoDescription
        seoKeywords
      }
    }
  }
`;
