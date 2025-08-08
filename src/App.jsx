
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css'
import Navbar from './Component/Navbar';
import Payment from './pages/Payment';
import { useState } from 'react';

function App() {
 const [search, setSearch] = useState('');

  return (
    <BrowserRouter>
      <Routes>
         
        <Route path='/' element={<Navbar onSearch={setSearch}/>}>
          <Route index element={<Home search={search}/> }/>
          <Route path='/products' element={<Products search={search}/>} />
          <Route path='/products/:id' element={<ProductDetails/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/payment'element={<Payment/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
