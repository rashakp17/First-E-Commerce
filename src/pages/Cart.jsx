import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateQuantity } from '../Features/CartSlice';
import { Link} from 'react-router-dom';
import Checkout from './Checkout';
import OrderSummary from '../Component/OrderSummary';

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector((state)=> state.cart.cartItems);




  return (
    <div className='pt-20'>
      <h2 className='text-white font-opensans text-2xl font-bold text-center mt-9 md:mt-6 m-5'>CART</h2>
      {cartItems.length === 0 && <p className=' text-5xl text-center font-bold text-white md:justify-center'>Cart is empty</p>}
      <div className='flex flex-col md:flex-row gap-7 '>

        <div>
          
          {cartItems.map((item)=>(
          
            <div key={item.id} className='flex items-center mx-5 flex-row h-36 text-sm md:w-[700px] justify-center my-4 md:ml-[400px]'>
              <img src={item.image} alt={item.title} className='h-20 w-20  mr-5'/>
              <div className='flex-1 '>
                <h2 className='text-white text-sm my-5 font-opensans md:text-xl font-semibold'>{item.title}</h2>
                <div className='flex flex-row'>
                  <input type='number' value={item.quantity} onChange={(e)=>dispatch(updateQuantity({id: item.id, quantity: Number(e.target.value)}))}
                    className=' px-1 mb-4 h-10 w-24 text-center border font-poppins border-gray-500 bg-transparent text-white'min="1"/>
                    <button className='text-white h-10 w-28 rounded  '
                      onClick={()=>dispatch(removeFromCart(item.id))}>Remove </button>
                </div>
                
              </div>
              <p className='text-white font-normal font-poppins text-start text-sm md:text-xl '>₹{item.price}</p>
            </div>
          ))}
        </div>
          {cartItems.length > 0 && (
            <div className=' flex flex-col gap-4 mx-5'>
             <OrderSummary/>
              <button className='md:w-full w-80 text-white bg-gray-500 text-xl font-semibold h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50' ><Link to={`/checkout`}>CONTINUE</Link> </button>
              <button
              className='md:w-full w-80 text-white bg-gray-500 text-xl font-semibold h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50'
              onClick={()=>dispatch(clearCart())}>
                CLEAR CART 
              </button>
            
            </div>
          )}
      </div>
      
    </div>
  );
};

export default Cart;