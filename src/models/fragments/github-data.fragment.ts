import { graphql } from 'gatsby';

export const githubData = graphql`
  fragment GithubData on GithubData {
    data {
      viewer {
        avatarUrl
        email
        login
        name
      }
    }
  }
`;
