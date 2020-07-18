import React, { FC } from 'react';
import Layout from '@components/layout';
import { graphql } from 'gatsby';

export interface BlogPostProps {
  data: {
    markdownRemark: {
      html: string;
      frontmatter: {
        title: string;
      };
    };
  };
}

const BlogPost: FC<BlogPostProps> = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}></div>
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
      }
    }
  }
`;
