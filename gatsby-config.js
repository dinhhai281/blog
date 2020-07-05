if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env',
  });
}

console.log(process.env.GITHUB_API_KEY);

module.exports = {
  siteMetadata: {
    author: 'Hai Nguyen',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-intl',
      options: {
        path: `${__dirname}/src/intl`,
        languages: ['en', 'vi'],
        defaultLanguage: 'en',
        redirect: true,
      },
    },
    {
      resolve: 'gatsby-source-github-api',
      options: {
        token: process.env.GITHUB_API_KEY,
        graphQLQuery: `
          query { 
            viewer { 
              login
              name
              avatarUrl
              email
            }
        }
        `,
      },
    },
  ],
};
