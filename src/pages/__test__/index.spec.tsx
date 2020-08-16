import Home, { HomeProps } from '@pages/index';
import { render, layoutMockSetup } from '@utils/testing';
import React from 'react';
import userEvent from '@testing-library/user-event';

let props: HomeProps;
beforeAll(() => {
  layoutMockSetup();
});

beforeEach(() => {
  props = {
    data: {
      site: {
        siteMetadata: {
          author: 'author',
          githubUrl: 'githuburl',
          tags: [],
        },
      },
      allMarkdownRemark: {
        edges: [
          {
            node: {
              excerpt: 'excerpt 1',
              id: 'id 1',
              frontmatter: {
                date: '2020-07-11T00:00:00.000Z',
                title: 'title 1',
                path: '/path1',
                tags: 'JAVASCRIPT',
              },
            },
          },
          {
            node: {
              excerpt: 'excerpt 2',
              id: 'id 2',
              frontmatter: {
                date: '2020-07-12T00:00:00.000Z',
                title: 'title 2',
                path: '/path2',
                tags: 'JAVASCRIPT',
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

describe('Home', () => {
  it('render correctly', () => {
    const { asFragment } = render(<Home data={props.data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('Avatar Section', () => {
  it('exist', () => {
    const { getByAltText } = render(<Home data={props.data} />);
    const element = getByAltText('avatar');
    expect(element).toBeTruthy();
  });

  it('use correct source', () => {
    const { getByAltText } = render(<Home data={props.data} />);
    const element = getByAltText('avatar');
    expect(element.getAttribute('src')).toEqual(props.data.allGithubData.edges[0].node.data.viewer.avatarUrl);
  });

  it('open new new window when clicked', () => {
    const { getByAltText } = render(<Home data={props.data} />);
    const element = getByAltText('avatar');
    global.open = jest.fn();

    userEvent.click(element);
    expect(global.open).toHaveBeenCalled();
  });
});

describe('Posts', () => {
  it('render correctly', () => {
    const { getAllByTestId } = render(<Home data={props.data} />);
    const elements = getAllByTestId('post');
    expect(elements).toHaveLength(2);
  });

  it('sorted descending by date', () => {
    const { getAllByTestId } = render(<Home data={props.data} />);
    const titles = getAllByTestId('post').map(element => element.querySelector('a')?.innerHTML);
    const expected = props.data.allMarkdownRemark.edges
      .sort((a, b) =>
        [a.node.frontmatter.date, b.node.frontmatter.date].map(Date.parse).reduce((acc, cur) => cur - acc)
      )
      .map(item => item.node.frontmatter.title);

    expect(titles).toEqual(expected);
  });
});
