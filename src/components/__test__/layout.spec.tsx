import Layout from '@components/layout';
import { layoutMockSetup, render } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('Layout', () => {
  it('renders correctly', () => {
    const { asFragment } = render(<Layout></Layout>);

    expect(asFragment()).toMatchSnapshot();
  });
});
