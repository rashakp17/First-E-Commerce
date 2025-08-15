import React, { useState } from 'react';
import callimg from '../assets/icons8-call-50.png';
import locationimg from '../assets/icons8-location-50.png';
import OrderSummary from '../Component/OrderSummary';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    house: '',
    road: '',
    pincode: '',
    city: '',
    state: '',
    landmark: '',
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
    if (!formData.house) newErrors.house = 'House number is required';
    if (!formData.road) newErrors.road = 'Road/Area is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/payment');
    }
  };

  return (
    
    <div className='pt-28'>
      <h2 className='text-white font-opensans w-80 ml-3 text-xl font-semibold md:ml-[400px] mt-6 mb-5'>ADD DELIVERY DETAILS</h2>
      <div className='flex flex-col md:flex-row gap-6 w-80'>

        <div className='md:ml-[400px] flex flex-col gap-5 mx-3 w-80  md:w-[800px]'>

          <div className='flex flex-row gap-2'>
            <img className='mt-1 h-[18px] w-[18px]' src={callimg} />
            <h3 className='text-white'>CONTACT DETAILS</h3>
          </div>

          <input
            name="name"
            placeholder="NAME"
            className='input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}

          <input
            name="contact"
            placeholder="CONTACT NUMBER"
            className='input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.contact && <p className='text-red-500 text-sm'>{errors.contact}</p>}

          <div className='flex flex-row gap-2'>
            <img className='mt-1 h-[18px] w-[18px]' src={locationimg} />
            <h3 className='text-white'>ADDRESS</h3>
          </div>

          <input
            name="house"
            placeholder="HOUSE NO./BUILDING NO."
            className='input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.house && <p className='text-red-500 text-sm'>{errors.house}</p>}

          <input
            name="road"
            placeholder="ROAD NAME /AREA /COLONY"
            className='input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.road && <p className='text-red-500 text-sm'>{errors.road}</p>}

          <input
            name="pincode"
            placeholder="PINCODE"
            className='input bg-transparent text-white'
            onChange={handleChange}
          />
          {errors.pincode && <p className='text-red-500 text-sm'>{errors.pincode}</p>}

          <div className='flex flex-row gap-2'>
            <input
              name="city"
              placeholder="CITY"
              className='input bg-transparent text-white'
              onChange={handleChange}
            />
            <input
              name="state"
              placeholder="STATE"
              className='input bg-transparent text-white'
              onChange={handleChange}
            />
          </div>
          {errors.city && <p className='text-red-500 text-sm'>{errors.city}</p>}
          {errors.state && <p className='text-red-500 text-sm'>{errors.state}</p>}

          <input
            name="landmark"
            placeholder="NEARBY FAMOUS PLACE /SHOP /SCHOOL (OPTIONAL)"
            className='input bg-transparent w-80 text-white'
            onChange={handleChange}
          />

          <button
            className='mt-2 mx-4 px-4 py-2 text-sm md:w-full  w-80 text-white bg-gray-500 md:text-xl font-semibold h-10 rounded-lg hover:bg-gray-700 mb-4 active:bg-gray-400 active:bg-opacity-50'
            onClick={handleSubmit}
          >
            SAVE ADDRESS AND CONTINUE
          </button>
        </div>

        <div className='mx-10 mb-10 '>
          <OrderSummary />
        </div>
      </div>
    </div>
      
    
  );
};

export default Checkout;
