import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black absolute z-10 text-white bg-opacity-70 p-4 w-full">
      <div className='flex '>
      <Link to={'/'}>
      <img src="logo.svg" className='h-6' alt="" />
      </Link>
      </div>
    </header>
  );
};

export default Header;
