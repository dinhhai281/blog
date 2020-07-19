if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({
    path: '.env',
  });
}

module.exports = {
  pathPrefix: '/blog',
  siteMetadata: {
    author: 'Hai Nguyen',
    githubUrl: 'https://github.com/dinhhai281',
    title: 'Onyxia',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'articles',
        path: `${__dirname}/src/articles/`,
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
