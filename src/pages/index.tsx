import Layout from '@components/layout';
import { graphql } from 'gatsby';
import { changeLocale, useIntl } from 'gatsby-plugin-intl';
import React, { FC, useEffect, useCallback } from 'react';
import BlogItem from '@components/blog-item';
import SEO from '@components/seo';
import { Tag } from '@models';

export interface HomeProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
        githubUrl: string;
        tags: Tag[];
      };
    };
    allMarkdownRemark: {
      edges: {
        node: {
          id: string;
          excerpt: string;
          frontmatter: {
            date: string;
            path: string;
            title: string;
            tags: string;
          };
        };
      }[];
    };
    allGithubData: {
      edges: {
        node: {
          data: {
            viewer: {
              name: string;
              avatarUrl: string;
            };
          };
        };
      }[];
    };
  };
}

type SiteData = Pick<HomeProps['data'], 'site'>['site'];
type AllMarkdownRemark = Pick<HomeProps['data'], 'allMarkdownRemark'>['allMarkdownRemark'];
type AllGithubData = Pick<HomeProps['data'], 'allGithubData'>['allGithubData'];

const Home: FC<HomeProps> = ({ data }) => {
  const { formatMessage, locale } = useIntl();
  useEffect(() => {
    changeLocale(locale);
  }, [locale]);

  const handleAvatarClick = useCallback(() => {
    window.open(data.site.siteMetadata.githubUrl, '_blank');
  }, []);

  return (
    <Layout>
      <SEO />
      <section className='flex'>
        <div className='flex items-center pr-2'>
          <img
            className='p-0 m-0 w-10 h-10 md:w-12 md:h-12 rounded-full cursor-pointer'
            src={data.allGithubData.edges[0].node.data.viewer.avatarUrl}
            onClick={handleAvatarClick}
            alt='avatar'
          />
        </div>
        <div className='pl-2 grid grid-cols-1 grid-rows-2'>
          <span className='text-xs md:text-sm'>
            {formatMessage({ id: 'headline_1' })}
            &nbsp;
            <a
              href={data.site.siteMetadata.githubUrl}
              rel='noreferrer'
              target='_blank'
              className='underline text-pink-700'
            >
              {data.allGithubData.edges[0].node.data.viewer.name}
            </a>
          </span>
          <span className='text-xs md:text-sm'>{formatMessage({ id: 'headline_2' })}</span>
        </div>
      </section>
      <section className='grid grid-cols-1 mt-6'>
        {data.allMarkdownRemark.edges
          .sort((a, b) =>
            [a.node.frontmatter.date, b.node.frontmatter.date].map(Date.parse).reduce((acc, cur) => cur - acc)
          )
          .map(({ node }) => (
            <div key={node.id} className='mb-6' data-testid='post'>
              <BlogItem source={node} />
            </div>
          ))}
      </section>
    </Layout>
  );
};

export default Home;

export const query = graphql`
  query {
    allGithubData {
      edges {
        node {
          data {
            viewer {
              avatarUrl
              email
              login
              name
            }
          }
        }
      }
    }

    site {
      siteMetadata {
        author
        githubUrl
        tags {
          key
          className
        }
      }
    }

    allMarkdownRemark(filter: {}) {
      edges {
        node {
          id
          frontmatter {
            date
            path
            title
            tags
          }
          excerpt
        }
      }
    }
  }
`;
