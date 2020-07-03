import React from 'react';

import Layout from '../layout';
import { renderWithProviders } from './utils/renderWithProviders';

describe('Layout', () => {
  it('renders correctly', () => {
    const { asFragment } = renderWithProviders(<Layout></Layout>);

    expect(asFragment()).toMatchSnapshot();
  });
});
