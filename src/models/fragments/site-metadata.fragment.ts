import { graphql } from 'gatsby';

export const siteMetadata = graphql`
  fragment SiteMetadata on Site {
    siteMetadata {
      author
      githubUrl
      title
      siteUrl
      description
      keywords
      tags {
        key
        className
      }
    }
  }
`;
