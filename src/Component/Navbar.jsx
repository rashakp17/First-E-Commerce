
import { Link, Outlet, useLocation } from 'react-router-dom';
import Logoimg from '../assets/Logoimg.png';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';


const Navbar = ({onSearch}) => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const steps =[
    {id :1 , label :'Cart' , path: '/cart'},
    {id :2 , label :'Address' , path: '/checkout'},
    {id :3 , label :'payment' , path: '/payment'}
  ];

  const getCurrentStep =() =>{
    const currentPath = location.pathname;
    const step = steps.find(s =>s.path === currentPath);
    return step ? step.id :1;
    }
  const currentStep = getCurrentStep();

 const getStepClasses = (stepId) => {
    if (stepId < currentStep) {
      return 'bg-transparent text-white border-white border-2'; // Completed
    } else if (stepId === currentStep) {
      return 'bg-transparent text-white border-white border-2'; // Current
    } else {
      return 'bg-transparent text-gray-500 border-gray-300'; // Upcoming
    }
  };
  const getTextClasses = (stepId) => {
    if (stepId <= currentStep) {
      return 'text-white font-semibold'; // Active/completed text
    }
    return 'text-gray-500'; // Inactive text
  };
  const getlineClasses =(stepId)=>{
    if(stepId < currentStep){
      return 'bg-white';
    }
    return 'bg-gray-500';
  }
  const showHeader = location.pathname === '/cart'|| location.pathname === '/checkout' || location.pathname === '/payment' ;
  const showSearchbar = location.pathname === '/' || location.pathname === '/home';
  const showBrand = location.pathname === '/' || location.pathname === '/home';
  const cartCount = useSelector(state => state.cart.cartItems.length);
  const handleSearchChange =(e) =>{
    setSearch(e.target.value);
    if (onSearch) onSearch(e.target.value);
  }     
  return (
    <div className=' p-0'>
      <nav className='flex flex-col md:flex-row  items-center gap-1  md:gap-60  lg:gap-80 bg-black text-white h-auto md:h-28 fixed w-full top-0 left-0 z-50 px-4 py-3'>
          <div className='flex flex-row gap-6 md:gap-10'>
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
          
            <div className='md:ml-96'>
              {showBrand && (
                <h4 className='flex justify-center items-center font-irish text-2xl md:text-5xl text-white mt-3 md:mt-0 text-center md:ml-10 flex-1'>
                  Aurezuk
                </h4>
              )}
            </div>
        </div>

          {showHeader && (
             <div className='flex flex-row'>
              {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                {/* Small Step Circle */}
                  <div className="flex flex-col items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-semibold ${getStepClasses(step.id)}`}>
                    {step.id < currentStep ? '✓' : step.id}
                    </div>
                    <span className={`mt-1 text-xs ${getTextClasses(step.id)}`}>
                      {step.label}
                    </span>
                  </div>

                  {/* Connecting Line - Same space as circle */}
                  {index < steps.length - 1 && (
                    <div className="w-6 mx-2">
                      <div className={`h-0.5 w-full ${getlineClasses(step.id)}`}></div>
                    </div>
                  )}
              </div>
              ))}
            </div>
          )}
         
        
      
      
           

        
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