

import homeone from '../assets/HM-IMG4.webp'
import hometwo from '../assets/freepik__i-want-a-photo-there-must-jewels-sling-bag-or-clut__19801.png'
import homethree from '../assets/HM-IMG2.webp'
import Footer from '../Component/Footer';
import Products from './Products';
import { useState } from 'react';
import Navbar from '../Component/Navbar';
import { useSearchParams } from 'react-router-dom';


const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  
  const category = searchParams.get('category') || '';

  const handleCategoryClick = (cat) => {
    if(cat){
       setSearchParams({category : cat});
    } else {
      setSearchParams({});
    }
  }
 






  return (
    <div >
      
      <Navbar onSearch={setSearch}/>
      {/* home view */}
      <div className=' w-full h-[440px] pt-12  '>
        <div >
          <img className=' w-[1510px] h-96 flex-shrink-0 object-cover object-center ' src={homeone} />
        </div>
      </div>
      <div className=' h w-full h-96 mt-5  '>
        <div >
          <img className='w-[1510px] h-96 flex-shrink-0 object-cover object-center' src={hometwo} />
        </div>
      </div>
        
      <div className=' w-full h-96  mt-5 '>
         <div >
          <img className='w-[1510px] h-96 flex-shrink-0 object-cover object-center' src={homethree} />
        </div>
      </div>
       {/* category */}
      
       {/* Category Buttons */}
      <div className='flex overflow-x-auto whitespace-nowrap scrollbar-hide flex-row justify-center gap-4 mt-5'>
        
        <button
          className='h-14 md:w-full rounded-lg text-gray-500 hover:bg-gray-700 active:bg-gray-500 active:text-gray-600 transition duration-100 bg-zinc-900'
          onClick={() => handleCategoryClick('')}
        >
          ALL
                  
        </button>
        <button
          className='h-14 md:w-full rounded-lg text-gray-500 hover:bg-gray-700 active:bg-gray-500 active:text-gray-600 transition duration-100 bg-zinc-900'
          onClick={() => handleCategoryClick('electronics')}
        >
          ELECTRONICS          
        </button>
        <button
          className='h-14 md:w-full rounded-lg hover:bg-gray-700 active:bg-gray-500 active:text-gray-600 transition duration-100 text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick("men's clothing")}
        >
          MEN'S CLOTHING
        </button>
        <button
          className='h-14 md:w-full rounded-lg text-gray-500 hover:bg-gray-700 active:bg-gray-500 active:text-gray-600 transition duration-100 bg-zinc-900'
          onClick={() => handleCategoryClick("women's clothing")}
        >
          WOMEN'S CLOTHING
        </button>
        <button
          className='h-14 md:w-full rounded-lg hover:bg-gray-700 active:bg-gray-500 active:text-gray-600 transition duration-100 text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick('jewelery')}
        >
          JEWELERY
        </button>
      
      </div>
      
      <Products category={category} search={search }/>
      
      <Footer />
      
      
    </div>
  );
};

export default Home;