import React from 'react';
import { useSelector } from 'react-redux';

const OrderSummary = () => {
  const cartItems = useSelector((state)=> state.cart.cartItems);
  const total = cartItems.reduce((acc, item )=> acc + item.price * item.quantity,0);

  return (
    <div className='flex flex-col gap-3'>
      <h2 className='text-white font-opensans text-xl mb-4'>ORDER SUMMARY</h2>
              {cartItems.map((item,idx)=>
              <div key={idx} className='flex justify-between '>
                <span className='text-white'>PRODUCT {idx + 1} x {item.quantity}</span>
                <span className='text-white'>₹{item.price * item.quantity}</span>
              </div>)}
              <h2 className='font-bold text-lg text-white'>Total : ₹{total.toFixed(2)} only</h2>
    </div>
  );
};

export default OrderSummary;