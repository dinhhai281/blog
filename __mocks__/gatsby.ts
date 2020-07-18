import React from 'react';
const gastby = jest.requireActual('gatsby');

module.exports = {
  ...gastby,
  graphql: jest.fn(),
  Link: jest
    .fn()
    .mockImplementation(
      ({ activeClassName, activeStyle, getProps, innerRef, partiallyActive, ref, replace, to, ...rest }) =>
        React.createElement('a', { ...rest, href: to })
    ),
  StaticQuery: jest.fn(),
  useStaticQuery: jest.fn(),
};
