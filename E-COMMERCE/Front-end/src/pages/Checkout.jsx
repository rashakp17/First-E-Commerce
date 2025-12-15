import React, { useState } from 'react';
import callimg from '../assets/icons8-call-50.png';
import locationimg from '../assets/icons8-location-50.png';
import OrderSummary from '../Component/OrderSummary';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../Features/CartSlice';

const Checkout = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();
const cartItems = useSelector((state) => state.cart.cartItems);

const [loading, setLoading] = useState(false);
const [apiError, setApiError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email:'',
    zipcode: '',
    city: '',
    state: '',
    landmark:''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.contact) newErrors.contact = 'Contact is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.pincode) newErrors.zipcode = 'Zipcode is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    return newErrors;
  };

  // const handleSubmit = () => {
  //   const validationErrors = validate();
  //   setErrors(validationErrors);
  //   if (Object.keys(validationErrors).length === 0) {
  //     navigate('/payment');
  //   }
  // };
  const handleSubmit = async () => {
  const validationErrors = validate();
  setErrors(validationErrors);
  if (Object.keys(validationErrors).length > 0) return;

  try {
  setLoading(true);
  setApiError('');

    // Build orderData from cart + address form
  const orderData = {
    items: cartItems.map((item) => ({
      productId: item.id,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
    })),
    address: {
      name: formData.name,
      contact: formData.contact,
      email: formData.email,
      pincode: formData.pincode,
      city: formData.city,
      state: formData.state,
      landmark: formData.landmark,
    },
    // You can add total, paymentMethod, etc. here
  };

  // Call backend to create order
  const res = await axios.post('http://localhost:5000/api/orders', orderData);
  console.log('Order created:', res.data);

  // Optionally clear cart (local or via backend thunk)
  dispatch(clearCart());

  // Go to payment or success page
  navigate('/payment');
  } catch (err) {
  setApiError(err.response?.data?.message || 'Failed to place order');
  } finally {
  setLoading(false);
  }
  };
    

  return (
    
    <div >
      <h2 className='text-white font-opensans w-80 ml-3 text-xl font-semibold md:ml-[400px] mt-6 mb-5'>ADD DELIVERY DETAILS</h2>
      <div className='flex flex-col md:flex-row justify-between'>
        
        <div className='md:ml-[400px] flex flex-col gap-5 mx-5 w-80  md:w-[600px]'>

          <div className='flex flex-row gap-2'>
            <img className='mt-1 h-[18px] w-[18px]' src={callimg} />
            <h3 className='text-white'>CONTACT DETAILS</h3>
          </div>

          <input
            name="name"
            placeholder="Name"
            className='border-b border-gray-400 focus:border-black outline-none w-80 input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

          <input
            name="contact"
            placeholder="Contact number"
            className='border-b border-gray-400 focus:border-black outline-none w-80 input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.contact && <p className='text-red-500 text-sm'>{errors.contact}</p>}

           <input
            name="email"
            placeholder="Email"
            className='border-b border-gray-400 focus:border-black outline-none w-80 input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

          <div className='flex flex-row gap-2'>
            <img className='mt-1 h-[18px] w-[18px]' src={locationimg} />
            <h3 className='text-white'>ADDRESS</h3>
          </div>

          <input
            name="pincode"
            placeholder="Pincode"
            className='border-b border-gray-400 focus:border-black outline-none w-80 input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.pincode && <p className='text-red-500 text-sm'>{errors.pincode}</p>}

          <div className='flex flex-row gap-2'>
            <input
              name="city"
              placeholder="City"
              className='border-b border-gray-400 focus:border-black outline-none w-60 input bg-transparent text-white'
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="State"
              className='border-b border-gray-400 focus:border-black outline-none w-60 input bg-transparent text-white'
              onChange={handleChange}
            />
          </div>
          {errors.city && <p className='text-red-500 text-sm'>{errors.city}</p>}
          {errors.state && <p className='text-red-500 text-sm'>{errors.state}</p>}

          <input
            name="landmark"
            placeholder="Nearby famous place /Shop /School (Optional)"
            className='border-b border-gray-400 focus:border-black outline-none w-[350px]  input bg-transparent  text-white'
            onChange={handleChange}
          />

          <button
          className='mt-2 px-4 text-sm md:w-[400px] w-80 text-white bg-gray-500 md:text-lg h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50'
          onClick={handleSubmit}
          disabled={loading}>

          {loading ? 'PROCESSING...' : 'SAVE ADDRESS AND CONTINUE'}
          </button>
          {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
        </div>

        <div className=' mb-10 '>
          <OrderSummary />
        </div>
      </div>
    </div>
      
    
  );
};

export default Checkout;
