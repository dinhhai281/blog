import Layout from '@components/layout';
import { graphql } from 'gatsby';
import { changeLocale, useIntl } from 'gatsby-plugin-intl';
import React, { FC, useEffect } from 'react';

export interface HomeProps {
  data: {
    site: {
      siteMetadata: {
        author: string;
      }
    }
  }
}

const Home: FC<HomeProps> = ({ data }) => {
  const { formatMessage, locale } = useIntl();
  useEffect(() => {
    changeLocale(locale);
  }, [locale]);

  return (
    <Layout>
      <div className='grid grid-cols-5 gap-2'>
        <div className="col-span-1 row-span-2">
          Avatar
        </div>
        <div className="col-span-4">
          { formatMessage({ id: 'headline_1' }) }
          &nbsp;
          <a
            href='https://github.com/dinhhai281'
            target='_blank'
            className='underline text-pink-700'
          >
            { data.site.siteMetadata.author }
          </a>
        </div>
        <div className="col-span-4">
          { formatMessage({ id: 'headline_2' }) }
        </div>
      </div>
    </Layout>
  );
};

export default Home;

export const query = graphql`
  query {
    site {
      siteMetadata {
        author
      }
    }
  }
`;
