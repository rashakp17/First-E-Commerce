
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logoimg from '../assets/Logoimg.png';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Navbar = ({onSearch}) => {
  const [search, setSearch] = useState('');
  const location = useLocation();

  const showSearchbar = location.pathname === '/' || location.pathname === '/home';
  const cartCount = useSelector(state => state.cart.cartItems.length);
  const handleSearchChange =(e) =>{
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }     
  return (
    <div className=' p-0'>
      <nav className='flex  md:flex-row items-center justify-between gap-10 bg-black text-white h-auto md:h-28 fixed w-full top-0 left-0 z-50 px-4 py-3'>
        <div className='flex items-center w-full md:w-auto'>
          <Link to="/" >
            <img src={Logoimg} className='w-12 h-12 md:w-16 md:h-16 object-cover ' alt='logo' />
          </Link>
        </div>
          
        <div className='relative mt-3 md:mt-0'>
          <Link to="/cart" className='block '>
          {cartCount >0 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                {cartCount}</span>
            )}
            <ShoppingCart size={35} />
            
          </Link>
        </div>
        <h4 className='font-irish text-2xl md:text-5xl text-white mt-3 md:mt-0 text-center md:ml-10 flex-1' >Aurezuk</h4>
        {showSearchbar && (
          <input 
        type="text" 
        placeholder='    Search'
        value={search}
        onChange={handleSearchChange}
        className='mt-3 md:mt-0 h-10 w-full md:w-96 rounded-full pl-4 text-gray-500 font-opensans bg-zinc-900'
      />
       
        )}
        
        
        
      </nav>
      <div className=''>
        <Outlet/>
      </div>
    </div>
  );
};

export default Navbar;