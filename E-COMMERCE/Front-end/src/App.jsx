import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Component/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import Login from './pages/Login';
import Register from './pages/Register';
import { Outlet } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './Component/AdminRoutes';
import AdminDashboard from './pages/AdminDashboard';
import AdminAddProduct from './pages/AdminAddProduct';

function Layout({ onSearch }) {
  return (
    <>
      <Navbar onSearch={onSearch} />

      <main className="pt-28">
        <Outlet />
      </main>
    </>
  );
}

function App() {
  const [search, setSearch] = useState('');
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Layout onSearch={setSearch} />}>
          <Route index element={<Home />} />
          <Route path='products' element={<Products search={search} />} />
          <Route path='products/:id' element={<ProductDetails />} />
          <Route element={<ProtectedRoute />}>
            <Route path='cart' element={<Cart />} />
            <Route path='checkout' element={<Checkout />} />
            <Route path='payment' element={<Payment />} />
          </Route>
          <Route element={<AdminRoute/>}>
            <Route path='admin' element={<AdminDashboard/>}/>
             <Route path='admin/products/new' element={<AdminAddProduct />} />
          </Route>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;