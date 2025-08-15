import {  Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import star from '../assets/icons8-star-48.png';
import Footer from '../Component/Footer';
import { addToCart } from '../Features/CartSlice';
import Navbar from '../Component/Navbar';
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = parseInt(id);
  console.log("product ID :",id)

  const product = useSelector((state) =>
    state.products.products.find((p) => p.id === productId)
  );
  const allProducts = useSelector(state => state.products.products);
  const relatedProducts = allProducts.filter(
    p => p.category === product.category && p.id !== product.id
  );

  
  if (!product) {
    return <p className='text-red-700 text-2xl'>Product not found</p>;
  }

  return (

    <div className=''>
      <Navbar />
      <h2 className='text-white font-opensans text-2xl font-bold text-center mt-32'>PRODUCT DETAILS</h2>
      <div className='container mx-auto px-5'>
        <div key={product.id} className='grid grid-cols-1 sm:grid-cols-2 gap-8 mt-7 items-center'>
          <img
            className='w-full max-w-xs h-auto mx-auto object-contain'
            src={product.image}
            alt={product.title}
          />
          <div>
            <button className='w-full sm:w-80 text-white bg-gray-500 text-xl font-semibold h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50'
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
            <h3 className='text-base sm:text-lg lg:text-xl text-white font-opensans font-semibold mt-3 mb-0'>
            {product.title}
            </h3>
            <h3 className='text-yellow-600 font-semibold font-opensans text-xl sm:text-2xl'>
              Rs.{product.price} Only
            </h3> 
            <div className='flex flex-row gap-2 mb-5 mt-3'>
              <img className='h-5 w-5 mt-1' src={star}/>
              <h4 className='text-white font-opensans text-xl font-bold ml-1' >{product.rating.rate}</h4>
            </div>
            
            <h3 className='text-white font-opensans font-semibold mt-2'>
              {product.description}
            </h3> 
          </div>
        </div>
      </div>
      <div>
        {relatedProducts.length > 0 && (
          <div>
            <h2 className='text-white text-center text-xl font-bold mt-6 mb-4'>RELATED PRODUCTS</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6 mt-5 mx-2 mb-2'>
              {relatedProducts.map(rp =>(
                <div className=' rounded-lg p-4 flex flex-col items-center mb-6 max-w-xs w-full hover:shadow-lg hover:scale-105 transition-all duration-200' key={rp.id}>
                  <Link to={`/products/${rp.id}`}>
                  <img className='h-40 w-auto object-contain mb-2 mx-auto' src={rp.image} alt={rp.title} />
                  <h3 className='text-white font-opensans font-semibold mt-3 text-center text-base sm:text-lg'>{rp.title}</h3>
                  <h3 className='text-yellow-600 font-bold text-center text-xl sm:text-2xl'>Rs.{rp.price}</h3>
                  </Link>
                </div>
              ))}
            </div>

          </div>
        )}
        <Footer/>
      </div>
    </div>
  );
};

export default ProductDetails;
