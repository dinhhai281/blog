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
      frontmatter: {
        date: '2020-07-12T00:00:00.000Z',
        title: 'title',
        path: '/path',
        tags: 'JAVASCRIPT',
      },
      excerpt: 'excerpt',
      tags: [
        {
          key: 'JAVASCRIPT',
          className: 'tag-js',
        },
      ],
    };
  });

  it('render correctly', () => {
    const { asFragment } = render(<BlogItem {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it('link to post', () => {
    const { getByTestId } = render(<BlogItem {...props} />);
    const element = getByTestId('title');

    expect(element.getAttribute('href')).toEqual(`/en${props.frontmatter.path}`);
  });
});
