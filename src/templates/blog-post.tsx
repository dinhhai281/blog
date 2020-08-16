import Layout from '@components/layout';
import { graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';
import React, { FC } from 'react';
import SEO from '@components/seo';

export interface BlogPostProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
        featuredImage: {
          childImageSharp: {
            fluid: FluidObject;
          };
        };
      };
    };
  };
}

const BlogPost: FC<BlogPostProps> = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.markdownRemark.frontmatter.title} />
      <div className='pb-24'>
        <header>
          <h1 data-testid='title' className='mb-12 text-2xl md:text-3xl lg:text-4xl text-pink-700 font-semibold'>
            {data.markdownRemark.frontmatter.title}
          </h1>
          <Img
            alt='featured-img'
            className='mb-8 mx-1'
            fluid={data.markdownRemark.frontmatter.featuredImage?.childImageSharp?.fluid}
          />
        </header>

        <div data-testid='post-content' dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
      </div>
    </Layout>
  );
};

export default BlogPost;

export const query = graphql`
  query($mdpath: String!) {
    markdownRemark(frontmatter: { path: { eq: $mdpath } }) {
      html
      frontmatter {
        title
        path
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1080) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
