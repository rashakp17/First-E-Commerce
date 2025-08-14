
import { useSelector } from 'react-redux';
import { Link, useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../Features/ProductSlice';

const Products = ({ search}) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const {products , error ,loading} = useSelector((state) => state.products);
 // In Products.jsx or a parent component

const dispatch = useDispatch();
useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);
 

  let filteredProducts = category
   ? products.filter((product)=> product.category === category)
   : products;

  if (search) {
    filteredProducts = filteredProducts.filter((product) => 
      product.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  return (
    <div className='pt-20'>
      <h2 className='text-white font-opensans text-2xl font-bold text-center mt-6'>PRODUCTS</h2>
      {loading && <p>Loading...</p>}
      {error && <p className='font-opensans text-red-800 '>Error: {error}</p>}
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 mt-5 ml-2 mb-2'>
        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500 text-3xl w- my-[200px]">
            No products found.
          </div>
                ) : (
              filteredProducts.map(product => (
                <div className=' rounded-lg p-4 flex flex-col items-center mb-6 max-w-xs w-full hover:shadow-lg hover:scale-105 transition-all duration-200' key={product.id}>
            <Link to={`/products/${product.id}`}>
            <img className='h-40 w-auto object-contain mb-2 mx-auto' src={product.image} alt={product.title} />
            <h3 className='text-white font-opensans font-semibold mx-0 mt-3 text-center text-base sm:text-lg'>{product.title}</h3>
            <h3 className='text-yellow-600 font-bold text-center text-xl sm:text-2xl'>Rs.{product.price}</h3>
            </Link>
            
            </div>
              ))
            )}
       </div>

    </div>
  );   
};

export default Products;