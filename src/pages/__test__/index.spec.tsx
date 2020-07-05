import { render } from '@utils/testing';
import React from 'react';

import Home, { HomeProps } from '@pages/index';

describe('Home', () => {
  let props: HomeProps;
  beforeEach(() => {
    props = {
      data: {
        site: {
          siteMetadata: {
            author: 'Author',
          },
        },
      },
    };
  });

  it('render correctly', () => {
    const { asFragment } = render(<Home data={props.data}></Home>);

    expect(asFragment()).toMatchSnapshot();
  });
});
