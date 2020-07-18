const tailwindConfig = require('./tailwind.config');

module.exports = () => ({
  plugins: [
    require('tailwindcss')(tailwindConfig),
    require('postcss-import'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
  ],
});
