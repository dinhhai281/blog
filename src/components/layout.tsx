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
    <div className='container pt-6 md:pt-10 lg:pt-12 px-8 md:px-16 lg:px-32 mx-auto'>
      <header className='flex justify-between items-center mb-6 md:mb-10 lg:mb-12'>
        <h1 className='text-pink-700 text-3xl md:text-4xl lg:text-5xl font-bold leading-10'>
          <Link to='/'>{data.site.siteMetadata.title}</Link>
        </h1>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
