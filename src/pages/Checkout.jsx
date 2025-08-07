import React from 'react';
import callimg from '../assets/icons8-call-50.png';
import locationimg from '../assets/icons8-location-50.png';
import OrderSummary from '../Component/OrderSummary';
import { Link } from 'react-router-dom';

const Checkout = () => {
  return (
    <>
    <h2 className='text-white font-opensans text-xl font-semibold ml-[400px] mt-6 mb-5'>ADD DELIVERY DETAILS</h2>
    <div className='flex flex-row gap-6'>
      
      <div className='ml-[400px] flex flex-col gap-5 w-[700px] '>
        
        <div className=' flex flex-row gap-2'>
          <img className='mt-1 h-[18px] w-[18px]' src={callimg}/><h3 className='text-white'>CONTACT DETAILS</h3>
        </div>
        <input type='text' placeholder='NAME' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <input type='text' placeholder='CONTACT NUMBER' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <div className=' flex flex-row gap-2'>
          <img className='mt-1 h-[18px] w-[18px]' src={locationimg}/><h3 className='text-white'>ADDRESS</h3>
        </div>
        <input type='text' placeholder='HOUSE NO./BUILDING NO.' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <input type='text' placeholder='ROAD NAME /AREA /COLONY' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <input type='text' placeholder='PINCODE' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <div className='flex flex-row gap-2'>
          <input type='text' placeholder='CITY' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
          <input type='text' placeholder='STATE' className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        </div>
        <input type='text' placeholder='NEARBY FAMOUS PLACE /SHOP /SCHOOL, ETC (OPTIONAL)' className='h-10 w-[610px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'/>
        <button className='mt-2 px-4 py-2 w-[610px] text-xl bg-gray-500 text-white rounded mb-20'> <Link to={`/payment`}>SAVE ADDRESS AND CONTINUE</Link> </button>
        
      </div>
      <div className='ml-0'>
        <OrderSummary />

      </div>
      
    </div>
   </> 
  );
};

export default Checkout;