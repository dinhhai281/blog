import React, { FC } from 'react';
import { Link } from 'gatsby-plugin-intl';

const Layout: FC = ({ children }) => {
  return (
    <div className='container px-5 pt-8 mx-auto'>
      <header className='flex justify-between items-center mb-8'>
        <h1 className='text-pink-700 text-4xl font-bold leading-10'>
          <Link to='/about/'>Onyxia</Link>
        </h1>
        <div>&nbsp;</div>
      </header>
      {children}
    </div>
  );
};

export default Layout;
