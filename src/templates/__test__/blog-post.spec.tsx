import BlogPost, { BlogPostProps } from '@templates/blog-post';
import { layoutMockSetup, render } from '@utils/testing';
import React from 'react';

beforeAll(() => {
  layoutMockSetup();
});

describe('BlogPost Component', () => {
  let props: BlogPostProps;

  beforeEach(() => {
    props = {
      data: {
        markdownRemark: {
          frontmatter: {
            title: 'title',
            featuredImage: {
              childImageSharp: {
                fluid: {
                  src: 'src',
                  aspectRatio: 16 / 9,
                  sizes: 'sizes',
                  srcSet: 'srcSet',
                  base64: undefined,
                },
              },
            },
          },
          html: '<p>Test Blog Post</p>',
        },
      },
    };
  });
  it('render correctly', () => {
    const { asFragment } = render(<BlogPost data={props.data} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
