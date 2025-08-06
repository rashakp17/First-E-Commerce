import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Logoimg from '../assets/Logoimg.png';
import Homeimg from '../assets/homeimg.png';
import Cartimg from '../assets/AddtoCartimg.png'

const Navbar = () => {
  return (
    <div className='m-0 p-0'>
      <nav className='flex flex-row gap-7 bg-black text-white h-20 posiition-fixed '>
        <img src={Logoimg} className='ml-5 mt-3 h-14 w-16' alt='logo' />
        <Link to="/" >
          <img className='ml-5 mt-3 h-14 w-14' src={Homeimg} />
        </Link>
        <Link to="/cart">
          <img className='ml-5 mt-3 h-14 w-14' src={Cartimg} />
        </Link>

        <h4 className='font-irish text-5xl text-white-700 mt-3 ml-96 text-center' >Aurezuk</h4>
        <input type="text" placeholder='    Search' className='ml-7 mt-5 h-10 w-96 rounded-full pl-2 text-gray-500 font-opensans bg-zinc-900' />
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Navbar;