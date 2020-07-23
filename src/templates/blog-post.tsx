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
          <h1 className='mb-12 text-5xl text-pink-700'>{data.markdownRemark.frontmatter.title}</h1>
          <Img className='mb-8 mx-16' fluid={data.markdownRemark.frontmatter.featuredImage?.childImageSharp?.fluid} />
        </header>

        <main dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></main>
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
