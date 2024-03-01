import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black text-white p-4 w-full">
      <Link to={'/'}>
      <img src="logo.svg" className='h-6' alt="" />
      </Link>
    </header>
  );
};

export default Header;
