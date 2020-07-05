import Layout from '@components/layout';
import { render } from '@utils/testing';
import React from 'react';

describe('Layout', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Layout></Layout>);

    expect(asFragment()).toMatchSnapshot();
  });
});
