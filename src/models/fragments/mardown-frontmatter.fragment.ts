import { graphql } from 'gatsby';

export const markdownRemark = graphql`
  fragment MarkdownFrontmatter on MarkdownRemark {
    frontmatter {
      date
      path
      title
      tags
    }
  }
`;
