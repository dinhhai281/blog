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

  it('render title correctly', () => {
    const { getByTestId } = render(<BlogPost data={props.data} />);
    const element = getByTestId('title');

    expect(element.innerHTML).toEqual(props.data.markdownRemark.frontmatter.title);
  });

  it('render image correctly', () => {
    const { getByAltText } = render(<BlogPost data={props.data} />);
    const element = getByAltText('featured-img');

    expect(element.getAttribute('src')).toEqual(
      props.data.markdownRemark.frontmatter.featuredImage.childImageSharp.fluid.src
    );
  });

  it('render post content correctly', () => {
    const { getByTestId } = render(<BlogPost data={props.data} />);
    const element = getByTestId('post-content');

    expect(element.innerHTML).toEqual(props.data.markdownRemark.html);
  });
});
