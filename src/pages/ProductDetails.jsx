import {  useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import star from '../assets/icons8-star-48.png';
import Cart from './Cart';
import { addToCart } from '../Features/CartSlice';
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = parseInt(id);

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );

  if (!product) {
    return <p className='text-red-700 text-2xl'>Product not found</p>;
  }

  return (
    <div>
      <h2 className='text-white font-opensans text-2xl font-bold text-center mt-6'>PRODUCT DETAILS</h2>
      <div className='container mx-auto px-4'>
        <div key={product.id} className='grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7'>
          <img
            className='ml-20 mt-3 h-[450px] w-[450px]'
            src={product.image}
            alt={product.title}
          />
          <div>
            <button className='text-white ml-16 bg-gray-500 text-xl font-semibold h-10 w-80 rounded-lg hover:bg-gray-700'
            onClick={()=>
              dispatch(addToCart({
                id:product.id,
                title:product.title,
                price:product.price,
                image:product.image
              }))
            }
            >
              ADD TO CART </button>
            <h3 className='text-sm md:text-base lg:text-lg h-20 w-[630px] text-white font-opensans font-semibold mt-3  mb-0'>
            {product.title}
            </h3>
            <h3 className='text-yellow-600 font-semibold font-opensans  text-2xl'>
              Rs.{product.price} Only
            </h3> 
            <div className='flex flex-row gap-2 mb-5 mt-3'>
              <img className='h-5 w-5 mt-1' src={star}/>
              <h4 className='text-white font-opensans text-xl font-bold ml-1' >{product.rating.rate}</h4>
            </div>
            
            <h3 className='h-48 w-[600px] text-white font-opensans font-semibold '>
              {product.description}
            </h3>
            
          </div>
        
        </div>
      </div>
      
    </div>
  );
};

export default ProductDetails;
