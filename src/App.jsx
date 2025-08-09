
import { BrowserRouter, Route ,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import './App.css'
import Navbar from './Component/Navbar';
import Payment from './pages/Payment';


function App() {


  return (
    <BrowserRouter>
      <Routes>
         
        <Route path='/' element={<Navbar />}>
          <Route index element={<Home /> }/>
          <Route path='/products' element={<Products />} />
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
