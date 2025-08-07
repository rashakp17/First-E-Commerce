# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import homeone from '../assets/HM-IMG.webp';
import Footer from '../Component/Footer';

const Home = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchProducts = async () => {
    const url = category
      ? `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`
      : `https://fakestoreapi.com/products`;

    const res = await fetch(url);
    const data = await res.json();
    setProducts(data);
  };

  fetchProducts();
}, [category]);

  return (
    <div>
      {/* Home banners */}
      <div className='relative w-full h-96 mt-5'>
        <img className='ml-2 w-[1500px] h-96 object-cover' src={homeone} />
      </div>

      {/* Category Buttons */}
      <div className='flex gap-4 mt-5 ml-2'>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/?category=electronics")}
        >
          Electronics
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/?category=men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/?category=women's clothing")}
        >
          Women's Clothing
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/?category=jewelery")}
        >
          Jewelry
        </button>
        <button
          className='h-14 w-36 rounded-lg text-gray-500 bg-zinc-900'
          onClick={() => navigate("/")}
        >
          All Products
        </button>
      </div>

      {/* Product Cards */}
      <div className='grid grid-cols-4 gap-4 mt-5 ml-2'>
        {products.map((product) => (
          <div className='ml-1 h-[400px] w-[350px] mb-10' key={product.id}>
            <Link to={/products/${product.id}}>
              <img className='ml-6 mt-3 h-64 w-72' src={product.image} alt={product.title} />
              <h3 className='pl-2 h-20 w-[340px] text-white font-semibold mt-3 text-center'>
                {product.title}
              </h3>
              <h3 className='text-yellow-600 font-bold text-center text-2xl'>
                Rs. {product.price}
              </h3>
            </Link>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Home;