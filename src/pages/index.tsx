import Layout from '@components/layout';
import { graphql } from 'gatsby';
import { changeLocale, useIntl } from 'gatsby-plugin-intl';
import React, { FC, useEffect, useCallback } from 'react';
import BlogItem from '@components/blog-item';

export interface HomeProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
        githubUrl: string;
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
      <section className='flex'>
        <div className='flex items-center pr-2'>
          <img
            className='p-0 m-0 w-12 h-12 rounded-full cursor-pointer'
            src={data.allGithubData.edges[0].node.data.viewer.avatarUrl}
            onClick={handleAvatarClick}
          />
        </div>
        <div className='pl-2'>
          <div>
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
          </div>
          <div>{formatMessage({ id: 'headline_2' })}</div>
        </div>
      </section>
      <section className='flex mt-6 flex-col'>
        {data.allMarkdownRemark.edges
          .sort((a, b) =>
            [a.node.frontmatter.date, b.node.frontmatter.date].map(Date.parse).reduce((acc, cur) => cur - acc)
          )
          .map(({ node }) => (
            <div key={node.id} className='mb-6'>
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
          }
          excerpt
        }
      }
    }
  }
`;
