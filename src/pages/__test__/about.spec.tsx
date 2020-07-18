import About from '@pages/about';
import { render, layoutMockSetup } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('About', () => {
  it('render correctly', () => {
    const { asFragment } = render(<About></About>);

    expect(asFragment()).toMatchSnapshot();
  });
});
