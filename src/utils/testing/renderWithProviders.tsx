import { render } from '@testing-library/react';
import { IntlContextProvider, IntlProvider } from 'gatsby-plugin-intl';
import React, { FC } from 'react';

export const renderWithProviders = (component: JSX.Element, ...options: unknown[]) => {
  const Wrapper: FC = ({ children }) => (
    <IntlContextProvider value={{ language: 'en', routed: true }}>
      <IntlProvider locale='en'>{children}</IntlProvider>
    </IntlContextProvider>
  );
  return render(component, { wrapper: Wrapper, ...options });
};
