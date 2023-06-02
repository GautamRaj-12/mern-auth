import React from 'react';
import './header.css';
import Avatar from '@mui/material/Avatar';

const Header = () => {
  return (
    <>
      <header>
        <nav>
          <h1>HP Cloud</h1>
          <div className='avatar'>
            <Avatar style={{ backgroundColor: 'blue' }}>H</Avatar>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
