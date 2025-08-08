

import homeone from '../assets/HM-IMG4.webp'
import hometwo from '../assets/HM-IMG2.webp'
import homethree from '../assets/HM-IMG3.webp'
import { Link, Outlet, useNavigate} from 'react-router-dom';
import Footer from '../Component/Footer';
import { Children } from 'react';
import Products from './Products';


const Home = () => {
 
  const navigate = useNavigate();
  


 






  return (
    <div >
      {/* home view */}
      <div className='relative w-full h-96 mt-5 '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-left-bottom ' src={homeone} />
        </div>
      </div>
      <div className='relative h w-full h-96 mt-5  '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-center' src={hometwo} />
        </div>
      </div>
        
      <div className='relative w-full h-96  mt-5 '>
         <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-center' src={homethree} />
        </div>
      </div>
       {/* category */}
       <div className='grid grid-cols-4 gap-4 mt-5 ml-2 '>

       {/* Category Buttons */}
      <div className='flex gap-4 mt-5 ml-2'>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/products?category=electronics")}
        >
          Electronics
        </button>
      
      </div>
      
       </div>
      <Products/>
      <Footer />
      
      
    </div>
  );
};

export default Home;