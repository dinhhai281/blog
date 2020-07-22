import React, { FC } from 'react';
import { Link } from 'gatsby-plugin-intl';
import { useStaticQuery, graphql } from 'gatsby';

interface LayoutData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Layout: FC = ({ children }) => {
  const data: LayoutData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <div className='container pt-12 mx-auto px-8 md:px-16 lg:px-32'>
      <header className='flex justify-between items-center mb-12'>
        <h1 className='text-pink-700 text-6xl font-bold leading-10'>
          <Link to='/'>{data.site.siteMetadata.title}</Link>
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
