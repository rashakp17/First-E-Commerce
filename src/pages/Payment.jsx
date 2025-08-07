import React, { useState } from 'react';
import OrderSummary from '../Component/OrderSummary';

const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const handlePaymentMethodChange = (e)=> {
    setSelectedPaymentMethod(e.target.value);
  };
  const handleSubmit = ()=>{
    alert(`You have selevted ${selectedPaymentMethod} as your payment method`)
  }
  return (
    <div className='ml-[400px] flex flex-row gap-20 w-[800px]'>
      
      <div className='flex flex-col gap-5 '>
        <h2 className='text-white text-xl font-semibold mt-6'>SELECT PAYMENT METHOD</h2>
          <label>
          <input 
          type='radio'
          name='paymentMethod'
          value='UPI'
          checked={selectedPaymentMethod === 'UPI'}
          onChange={handlePaymentMethodChange}
          className='text-white mr-4'
          />
          <span className='text-white'>UPI</span>
        </label>
        <label>
          <input
          type='radio'
          name='paymentMethod'
          value='Cash on Delivery'
          checked={selectedPaymentMethod === 'Cash on Delivery'}
          onChange={handlePaymentMethodChange}
          className='text-white mr-4'
          />
          <span className='text-white'>Cash on Delivery</span>
        </label>
        <label>
          <input
          type='radio'
          name='paymentMethod'
          value={'Card Payment'}
          checked={selectedPaymentMethod === 'Card Payment'}
          onChange={handlePaymentMethodChange}
          className='text-white mr-4'
          />
          <span className='text-white'>Credit / Debit Card</span>
        </label>
      </div>
      <div className='mt-6'>
        <OrderSummary/>
        <button 
        onClick={handleSubmit}
        className='text-white '
        >
         PLACE ORDER
        </button>
      </div>
      
      
    </div>
  );
};

export default Payment;