const tailwindConfig = require('./tailwind.config');

module.exports = {
  plugins: [
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
      resolve: 'gatsby-plugin-postcss',
      options: {
        postCssPlugins: [
          require('tailwindcss')(tailwindConfig),
          require('autoprefixer'),
          ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
        ]
      }
    }
  ],
};
