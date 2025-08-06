import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Features/ProductSlice';
import { Link, Outlet } from 'react-router-dom';

const Products = () => {
  const dispatch = useDispatch();
  const {products , error ,Loading} = useSelector((state) => state.products);

  useEffect(() =>{
    dispatch(fetchProducts());
  },[dispatch]);

  return (
    <div>
      <h2 className='text-white font-opensans text-2xl font-bold text-center mt-6'>PRODUCTS</h2>
      {Loading && <p>Loading...</p>}
      {error && <p className='font-opensans text-red-800 '>Error: {error}</p>}
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 mt-5 ml-2 mb-2'>
        {products.map((product)=> (
          <div className='ml-1 h-[400px] w-[350px] mb-10' key={product.id}>
            <Link to={`/products/${product.id}`}>
            <img className='ml-6 mt-3 h-64 w-72 ' src={product.image} alt={product.title} />
            <h3 className='pl-2 h-20 w-[340px] text-white font-opensans font-semibold mt-3 text-center'>{product.title}</h3>
            <h3 className='text-yellow-600 font-bold text-center text-2xl'>Rs.{product.price}</h3>
            </Link>
            
            </div>
        ))}
       </div>

    </div>
  );   
};

export default Products;