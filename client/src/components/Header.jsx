import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black absolute z-10 text-white bg-opacity-70 p-4 w-full">
      <div className='flex w-full place-content-between '>
      <Link to={'/'}>
      <img src="logo.svg" className='h-6' alt="" />
      </Link>
      <Link to={'/blog'}>
      <div className='text-2xl font-bold cursor-pointer hover:scale-110 transition-all'>
        BLOG
      </div>
      </Link>
      </div>
    </header>
  );
};

export default Header;
