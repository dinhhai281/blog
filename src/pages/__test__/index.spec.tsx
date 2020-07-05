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
            author: 'author',
          },
        },
        allGithubData: {
          edges: [
            {
              node: {
                data: {
                  viewer: {
                    name: 'test',
                    avatarUrl: 'testurl',
                  },
                },
              },
            },
          ],
        },
      },
    };
  });

  it('render correctly', () => {
    const { asFragment } = render(<Home data={props.data}></Home>);

    expect(asFragment()).toMatchSnapshot();
  });
});
