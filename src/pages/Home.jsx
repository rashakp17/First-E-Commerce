
import homeone from '../assets/HM-IMG.webp'
import hometwo from '../assets/HM-IMG.webp'
import homethree from '../assets/HM-IMG.webp'
import { Link, useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
 



  return (
    <div >
      {/* home view */}
      <div className='relative w-full h-96 mt-5 '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-left-top ' src={homeone} />
        </div>
      </div>
      <div className='relative h w-full h-96 mt-5  '>
        <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-center' src={hometwo} />
        </div>
      </div>
        
      <div className='relative w-full h-96  mt-5 '>
         <div >
          <img className='ml-2 w-[1500px] h-96 flex-shrink-0 object-cover object-left-bottom' src={homethree} />
        </div>
      </div>
       {/* category */}
       <div className='grid grid-cols-4 gap-4 mt-5 ml-2'>

        <button type="text"  className='h-36 w-36 rounded-lg pl-2 text-gray-500 font-opensans bg-zinc-900' 
        onClick={() => navigate('/products?category=electronics')}>
         MEN'S CLOTHING
        </button>
       </div>

     
      
      
      
    </div>
  );
};

export default Home;