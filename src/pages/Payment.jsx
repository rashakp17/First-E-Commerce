import React, { useState } from 'react';
import OrderSummary from '../Component/OrderSummary';


const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const handlePaymentMethodChange = (e)=> {
    setSelectedPaymentMethod(e.target.value);
  };

  const [show ,setShow]= useState(false)
    const handleShow = () => {
      setShow(true);
      setTimeout(()=>{
        setShow(false);
      }, 1000)
    };
 
  return (
    <div className='ml-[400px] flex flex-row '>
      
      <div className='flex flex-col gap-5 w-[700px] '>
        <h2 className='text-white text-xl font-semibold mt-6'>SELECT PAYMENT METHOD</h2>
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
          value='UPI'
          checked={selectedPaymentMethod === 'UPI'}
          onChange={handlePaymentMethodChange}
          className='text-white mr-4'
          />
          <span className='text-white'>UPI</span>
        </label>
        {selectedPaymentMethod === 'UPI' && (
          <input 
          type='text'
          placeholder='Enter UPI ID'
          className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
          />
        )}
  
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
        {selectedPaymentMethod === 'Card Payment' && (
          <div className='flex flex-col gap-2'>
            <input 
            type='text'
            placeholder='Card Number'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            />
            <input 
            type='text'
            placeholder='Expiry Date (MM/YY)'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            />
            <input 
            type='text'
            placeholder='CVV'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            />
          </div>
        )}
      </div>
      <div className='mt-[66px] ml-7 flex flex-col gap-5'>
        <OrderSummary/>
        <button 
        onClick={handleShow}
        className='px-4 py-2 w-72 text-xl bg-gray-500 text-white text- rounded'
        >
         PLACE ORDER
        </button>
        {show &&(
        <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div class="bg-white w-64 h-64 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-4">
          <div class="text-green-500 text-5xl mb-4">✔️</div>
          <h2 class="text-xl font-semibold mb-2">Order Confirmed</h2>
          <p class="text-sm text-gray-600">Thank you for your purchase!</p>
        </div>
      </div>
      )}
      </div>
      
      
    </div>
  );
};

export default Payment;