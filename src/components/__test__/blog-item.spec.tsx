import BlogItem, { BlogItemProps } from '@components/blog-item';
import { render, layoutMockSetup } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('BlogItem Component', () => {
  let props: BlogItemProps;

  beforeEach(() => {
    props = {
      source: {
        id: 'id',
        frontmatter: {
          date: '2020-07-12T00:00:00.000Z',
          title: 'title',
          path: '/path',
          tags: 'JAVASCRIPT',
        },
        excerpt: 'excerpt',
      },
    };
  });

  it('render correctly', () => {
    const { asFragment } = render(<BlogItem source={props.source} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('link to post', () => {
    const { getByTestId } = render(<BlogItem source={props.source} />);
    const element = getByTestId('title');

    expect(element.getAttribute('href')).toEqual(`/en${props.source.frontmatter.path}`);
  });
});
