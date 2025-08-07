
import { useSelector } from 'react-redux';
import homeone from '../assets/HM-IMG4.webp'
import hometwo from '../assets/HM-IMG2.webp'
import homethree from '../assets/HM-IMG3.webp'
import { Link, useNavigate, useSearchParams} from 'react-router-dom';
import Footer from '../Component/Footer';


const Home = () => {
  const products = useSelector((state) => state.products)
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");

 

  const filteredProducts = category ? 
    products.filter(product => product.category === category): products ;




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

        <button type="text"  className=' h-14 w-36 rounded-lg  text-gray-500 font-opensans bg-zinc-900' 
        onClick={() => navigate("/products?category=electronics")}>
         ELECTRONICS
        </button>
        {Array.isArray(filteredProducts) && filteredProducts.map((product)=> (
          <div className='ml-1 h-[400px] w-[350px] mb-10' key={product.id}>
            <Link to={`/products/${product.id}`}>
            <img className='ml-6 mt-3 h-64 w-72 ' src={product.image} alt={product.title} />
            <h3 className='pl-2 h-20 w-[340px] text-white font-opensans font-semibold mt-3 text-center'>{product.title}</h3>
            <h3 className='text-yellow-600 font-bold text-center text-2xl'>Rs.{product.price}</h3>
            </Link>
            
          </div>
        ))}
       </div>
       <div>

       </div>
       <div>
       <Footer/>
       </div>
     
      
      
      
    </div>
  );
};

export default Home;