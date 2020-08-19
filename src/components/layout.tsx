import { SiteMetadata } from '@models';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby-plugin-intl';
import React, { FC } from 'react';
import SideBar from '@components/side-bar';

interface LayoutData {
  site: {
    siteMetadata: SiteMetadata;
  };
}

const Layout: FC = ({ children }) => {
  const data = useStaticQuery<LayoutData>(
    graphql`
      query {
        site {
          ...SiteMetadata
        }
      }
    `
  );

  return (
    <div className='flex'>
      <SideBar>
        <div>Side Nav</div>
      </SideBar>
      <div className='container pt-6 md:pt-10 lg:pt-12 px-8 md:px-16 lg:px-32'>
        <header className='flex justify-between items-center mb-6 md:mb-10 lg:mb-12'>
          <h1 className='text-pink-700 text-3xl md:text-4xl lg:text-5xl font-bold leading-10'>
            <Link to='/' role='link'>
              {data.site.siteMetadata.title}
            </Link>
          </h1>
        </header>
        <main role='main'>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
