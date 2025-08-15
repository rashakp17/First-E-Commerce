import React, { useState } from 'react';
import OrderSummary from '../Component/OrderSummary';




const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const handlePaymentMethodChange = (e)=> {
    setSelectedPaymentMethod(e.target.value);
  };
  const [errors , setErrors] = useState({});
  const [UPIData,setUPIData] = useState({
    upiID :'',
  });
  const [cardData,setCardData] = useState({
    cardNo :'',
    expiryDate :'',
    cvv :''
  });
  const [walletData,setWalletData] = useState({
    WalletProvider :'',
    WalletAddress :''
  })
  const handleUPIChange = (e) => {
    setUPIData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCardChange = (e) => {
    setCardData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWalletProviderSelect = (provider) => {
    setWalletData((prev) => ({
      ...prev,
      WalletProvider: provider,
    }));
  };

  const handleWalletAddressChange = (e) => {
    setWalletData((prev) => ({
      ...prev,
      WalletAddress: e.target.value,
    }));
  };

  const UPIvalidate =()=> {
    const newErrors ={};
    if(!UPIData.upiID)newErrors.upiID = 'UPI ID is required';
    return newErrors
  }
  const Cardvalidate =()=> {
    const newErrors ={};
    if(!cardData.cardNo)newErrors.cardNo = 'Card number is required';
    if(!cardData.expiryDate)newErrors.expiryDate = 'Expiry Date is required';
    if(!cardData.cvv)newErrors.cvv = 'CVV is required';
    return newErrors
  }
  const Walletvalidate =()=> {
    const newErrors ={};
    if(!walletData.WalletProvider)newErrors.WalletProvider = 'Wallet Provider is required';
    if(!walletData.WalletAddress)newErrors.WalletAddress = 'Wallet Address is required';
    return newErrors
  }
  const handleSubmit = () => {
    const validationErrors = {
      ...UPIvalidate(),
      ...Cardvalidate(),
      ...Walletvalidate()
    };
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      handleShow();
    }
  };
 

  const [show ,setShow]= useState(false)
    const handleShow = () => {
      setShow(true);
      setTimeout(()=>{
        setShow(false);
      }, 1000)
    };


 
  return (
    <div className='md:ml-[400px] flex flex-col md:flex-row pt-28'>
      
      <div className='flex flex-col gap-5 md:w-[700px] mx-3'>
        <h2 className='text-white text-xl font-semibold mt-6'>SELECT PAYMENT METHOD</h2>
        {/* cash on delivery */}
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
          {/* UPI payment */}
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
          <div>
            <input 
          type='text'
          name='upiID'
          placeholder='Enter UPI ID'
          className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
          onChange={handleUPIChange}
          />
          {errors.upiID && <p className='text-red-500 text-sm'>{errors.upiID}</p>}
          </div>
          
          
        )}
        
        
        {/* Card payment */}
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
            name='cardNo'
            placeholder='Card Number'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            onChange={handleCardChange}
            />
            {errors.cardNo && <p className='text-red-500 text-sm'>{errors.cardNo}</p>}
            <input 
            type='text'
            name='expiryDate'
            placeholder='Expiry Date (MM/YY)'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            onChange={handleCardChange}
            />
            {errors.expiryDate && <p className='text-red-500 text-sm'>{errors.expiryDate}</p>}
            <input 
            type='text'
            name='cvv'
            placeholder='CVV'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            onChange={handleCardChange}
            />
            {errors.cvv && <p className='text-red-500 text-sm'>{errors.cvv}</p>}

          </div>
        )}
        {/* wallet payment */}
        <label>
          <input
          type='radio'
          name='paymentMethod'
          value={'Wallet Payment'}
          checked={selectedPaymentMethod === 'Wallet Payment'}
          onChange={handlePaymentMethodChange}
          className='text-white mr-4'
          />
          <span className='text-white'>Wallet payment</span>
        </label>
        {selectedPaymentMethod === 'Wallet Payment'&&(
          <div>
            <div className='flex flex-col md:flex-row gap-4'>
              <button className='h-10 w-40 border-2 bg-gray-600 bg-opacity-40 border-gray-500 text-white rounded hover:bg-opacity-30 text-sm active:bg-opacity-60' onClick={handleWalletProviderSelect}>MetaMask 🦊</button>
              <button className='h-10 w-40 border-2 bg-gray-600 bg-opacity-40 border-gray-500 text-white rounded hover:bg-opacity-30 text-sm active:bg-opacity-60' onClick={handleWalletProviderSelect}>Trust Wallet 🔒</button>
              <button className='h-10 w-40 border-2 bg-gray-600 bg-opacity-40 border-gray-500 text-white rounded hover:bg-opacity-30 text-sm active:bg-opacity-60' onClick={handleWalletProviderSelect}>Coinbase Wallet 🟦</button>
              <button className='h-10 w-40 border-2 bg-gray-600 bg-opacity-40 border-gray-500 text-white rounded hover:bg-opacity-30 text-sm active:bg-opacity-60' onClick={handleWalletProviderSelect}>Phantom 👻</button>
            </div>
          {errors.WalletProvider && <p className='text-red-500 text-sm'>{errors.WalletProvider}</p>}
          <input 
            type='text'
            name='WalletAddress'
            placeholder='Wallet Address'
            className='h-10 w-[300px] px-2 border-b text-sm border-gray-500 bg-transparent text-white font-poppins'
            onChange={handleWalletAddressChange}
            />
            {errors.WalletAddress && <p className='text-red-500 text-sm'>{errors.WalletAddress}</p>}
          </div>
          
          
        )

        }
        
      </div>
      <div className='mt-[66px] mx-4 md:ml-7 flex flex-col gap-5'>
        <OrderSummary/>
        <button 
        onClick={handleSubmit}
        className='w-full sm:w-80 text-white bg-gray-500 text-xl font-semibold h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50'
        >
         PLACE ORDER
        </button>
        {show &&(
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white w-64 h-64 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-4">
          <div className="text-green-500 text-5xl mb-4">✔️</div>
          <h2 className="text-xl font-semibold mb-2">Order Confirmed</h2>
          <p className="text-sm text-gray-600">Thank you for your purchase!</p>
        </div>
      </div>
      )}
      </div>
      
      
    </div>
  );
};

export default Payment;