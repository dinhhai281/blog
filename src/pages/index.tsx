import Layout from '@components/layout';
import { graphql } from 'gatsby';
import { changeLocale, useIntl } from 'gatsby-plugin-intl';
import React, { FC, useEffect } from 'react';

export interface HomeProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
      };
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

const Home: FC<HomeProps> = ({ data }) => {
  const { formatMessage, locale } = useIntl();
  useEffect(() => {
    changeLocale(locale);
    console.log(data.allGithubData.edges[0].node.data.viewer.avatarUrl);
  }, [locale]);

  return (
    <Layout>
      <div className='grid grid-cols-5 gap-2'>
        <div className='col-span-1 row-span-2 flex items-center'>
          <img
            className="p-0 m-0 w-12 h-12 rounded-full"
            src={data.allGithubData.edges[0].node.data.viewer.avatarUrl}
          />
        </div>
        <div className='col-span-4'>
          {formatMessage({ id: 'headline_1' })}
          &nbsp;
          <a
            href='https://github.com/dinhhai281'
            target='_blank'
            className='underline text-pink-700'
          >
            {data.allGithubData.edges[0].node.data.viewer.name}
          </a>
        </div>
        <div className='col-span-4'>{formatMessage({ id: 'headline_2' })}</div>
      </div>
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
      }
    }
  }
`;
