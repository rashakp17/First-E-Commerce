
import { Link, Outlet } from 'react-router-dom';
import Logoimg from '../assets/Logoimg.png';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';


const Navbar = ({onSearch}) => {
  const [search, setSearch] = useState('');

  const handleSearchChange =(e) =>{
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }
  return (
    <div className='m-0 p-0'>
      <nav className='flex flex-row gap-7 bg-black text-white h-20 posiition-fixed '>
        <Link to="/" >
          <img src={Logoimg} className='md:w-[64px] sm:w-[20px] object-cover ml-5 mt-3 md:h-16 sm:h-[20px]' alt='logo' />
        </Link>
        <Link to="/cart" className='ml-5 mt-5 '>
          <ShoppingCart size={35} />
        </Link>

        <h4 className='font-irish text-5xl text-white-700 mt-3 ml-96 text-center' >Aurezuk</h4>
        <input 
        type="text" 
        placeholder='    Search'
        value={search}
        onChange={handleSearchChange}
        className='ml-7 mt-5 h-10 w-96 rounded-full pl-2 text-gray-500 font-opensans bg-zinc-900'
      />
      </nav>
      <div>
        <Outlet/>
      </div>
    </div>
  );
};

export default Navbar;