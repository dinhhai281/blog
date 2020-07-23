const tailwindConfig = require('./tailwind.config');

module.exports = () => ({
  plugins: [
    require('postcss-import'),
    require('tailwindcss')(tailwindConfig),
    require('postcss-nested'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [require('cssnano')] : []),
  ],
});
