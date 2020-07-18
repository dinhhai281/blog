const gatsbyPluginIntl = jest.requireActual('gatsby-plugin-intl');

module.exports = {
  ...gatsbyPluginIntl,
  changeLocale: jest.fn(),
};
