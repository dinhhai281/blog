import React, { FC, useState, useCallback } from 'react';
import cns from 'classnames';

import MenuIcon from '../assets/menu.svg';

const SideBar: FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const handleClick = useCallback(() => setIsMenuOpen(cur => !cur), []);

  return (
    <aside className={cns('side-bar', { 'side-bar--opened': isMenuOpen, 'side-bar--closed': !isMenuOpen })}>
      <div className='drawer'>
        <div className='toggle-btn' onClick={handleClick}>
          <MenuIcon />
        </div>
        {children}
      </div>
    </aside>
  );
};

export default SideBar;
