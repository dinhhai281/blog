import React from 'react';
import BlogItem, { BlogItemProps } from '@components/blog-item';
import { render } from '@utils/testing';

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
        },
        excerpt: 'excerpt',
      },
    };
  });

  it('render correctly', () => {
    const { asFragment } = render(<BlogItem source={props.source} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
