import About from '@pages/about';
import { render } from '@utils/testing';
import React from 'react';

describe('About', () => {
  it('render correctly', () => {
    const { asFragment } = render(<About></About>);

    expect(asFragment()).toMatchSnapshot();
  });
});
