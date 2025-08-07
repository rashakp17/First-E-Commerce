import React from 'react';
import insta from '../assets/icons8-instagram-logo-50.png';
import fb from '../assets/icons8-facebook-50.png';
import yt from '../assets/icons8-youtube-50.png';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div>
      <footer className='bg-gray-600 text-white py-4 mt-10 flex flex-row justify-between '>
        <div>
          <ul className='list-none ml-[100px]'>
            <li>Electronics</li>
            <li>Men's Clothing</li>
            <li>Women's Clothing</li>
            <li>Jewellery</li>
          </ul>
        </div> 
        <div>
          <ul className='list-none'>
            <li>About us</li>
            <li>Privacy policy</li>
            <li>Terms of service</li>
            <li>Refund policy</li>
            <li>FAQ’s</li>
            <li>Shipping policy</li>
            <li>Track orders</li>
          </ul>
        </div> 
        <div className='flex flex-col justify-items-end mr-[100px]'>
          <h2 className='text-wrap font-irish text-3xl text-center'>Aurezuk</h2>
          <h2>Head office | pin 00000 | details  | something</h2>
          <div className='flex flex-row justify-center'>
            <a className='w-10' href='https://www.instagram.com'><img className='h-10 w-10' src={insta} alt="instagram link" /></a> 
            <a className='w-10' href='https://www.facebook.com'><img className='h-10 w-10' src={fb} alt="facebook" /></a>
            <a className='w-10' href='https://www.youtube.com'><img className='h-10 w-10' src={yt} alt="youTube" /></a>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;