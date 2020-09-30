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
    title: 'Tấm Chiếu Mới Mua',
    siteUrl: 'https://dinhhai281.github.com/blog',
    description: 'Personal blog by Hai Nguyen',
    keywords: ['Blog', 'React', 'Angular', 'Javascript', 'Typescript', 'Functional Programming'],
    tags: [
      { key: 'TYPESCRIPT', className: 'tag-ts' },
      { key: 'JAVASCRIPT', className: 'tag-js' },
      { key: 'CSS', className: 'tag-css' },
      { key: 'REACT', className: 'tag-react' },
      { key: 'ANGULAR', className: 'tag-angular' },
      { key: 'RXJS', className: 'tag-rxjs' },
      { key: 'RUST', className: 'tag-rust' },
      { key: 'NODEJS', className: 'tag-nodejs' },
      { key: 'GRAPHQL', className: 'tag-graphql' },
      { key: 'FP', className: 'tag-fp' },
    ],
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-offline',
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
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
