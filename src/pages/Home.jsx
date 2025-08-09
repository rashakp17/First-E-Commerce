

import homeone from '../assets/HM-IMG4.webp'
import hometwo from '../assets/HM-IMG2.webp'
import homethree from '../assets/HM-IMG3.webp'
import Footer from '../Component/Footer';
import Products from './Products';
import { useState } from 'react';
import Navbar from '../Component/Navbar';


const Home = () => {
  const [category, setCategory] = useState('');
   const [search, setSearch] = useState('');

  

  const handleCategoryClick = (cat) => {
    setCategory(cat);
  }
 






  return (
    <div >
      
      <Navbar onSearch={setSearch}/>
      {/* home view */}
      <div className=' w-full h-[440px] pt-12  '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-left-bottom ' src={homeone} />
        </div>
      </div>
      <div className=' h w-full h-96 mt-5  '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-center' src={hometwo} />
        </div>
      </div>
        
      <div className=' w-full h-96  mt-5 '>
         <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-center' src={homethree} />
        </div>
      </div>
       {/* category */}
      
       {/* Category Buttons */}
      <div className='flex flex-row justify-center gap-4 mt-5 ml-2'>
        
        <button
          className='h-14 w-52 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => setCategory('')}
        >
          ALL
        </button>
        <button
          className='h-14 w-52 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick("electronics")}
        >
          ELECTRONICS
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick("men's clothing")}
        >
          MEN' CLOTHING
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick("women's clothing")}
        >
          WOMEN'S CLOTHING
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => handleCategoryClick("jewelery")}
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