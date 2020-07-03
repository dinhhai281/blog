import React, { Component, FC } from 'react';
import { render } from '@testing-library/react';
import { IntlContextProvider } from 'gatsby-plugin-intl';

export const renderWithProviders = (component: JSX.Element) =>
  render(
    <IntlContextProvider value={{ language: 'en', routed: true }}>
      {component}
    </IntlContextProvider>
  );
