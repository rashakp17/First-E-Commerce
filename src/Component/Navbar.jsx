
import { Link, Outlet } from 'react-router-dom';
import Logoimg from '../assets/Logoimg.png';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Navbar = ({onSearch}) => {
  const [search, setSearch] = useState('');
  const cartCount = useSelector(state => state.cart.cartItems.length);
  const handleSearchChange =(e) =>{
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }     
  return (
    <div className=' p-0'>
      <nav className='flex flex-row gap-7  bg-black text-white h-28 fixed w-full mt-0 pt-5 '>
        
          <Link to="/" >
          <img src={Logoimg} className='md:w-[64px] sm:w-[20px] object-cover ml-5 mt-3 md:h-16 sm:h-[20px]' alt='logo' />
        </Link>
        <div className='relative'>
          <Link to="/cart" className='ml-5 mt-5 '>
          {cartCount >0 && (
              <span className='absolute -top-0 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold'>
                {cartCount}</span>
            )}
            <ShoppingCart size={35} />
            
          </Link>
        </div>
        

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