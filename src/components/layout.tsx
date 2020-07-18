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
    <div className='container px-5 pt-8 mx-auto'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-pink-700 text-4xl font-bold leading-10'>
          <Link to='/'>{data.site.siteMetadata.title}</Link>
        </h1>
      </header>
      {children}
    </div>
  );
};

export default Layout;
