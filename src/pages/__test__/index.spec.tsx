import Home, { HomeProps } from '@pages/index';
import { render, layoutMockSetup } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('Home', () => {
  let props: HomeProps;
  beforeEach(() => {
    props = {
      data: {
        site: {
          siteMetadata: {
            author: 'author',
            githubUrl: 'githuburl',
          },
        },
        allMarkdownRemark: {
          edges: [
            {
              node: {
                excerpt: 'excerpt',
                id: 'id',
                frontmatter: {
                  date: '2020-07-12T00:00:00.000Z',
                  title: 'title',
                  path: '/path',
                },
              },
            },
          ],
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
