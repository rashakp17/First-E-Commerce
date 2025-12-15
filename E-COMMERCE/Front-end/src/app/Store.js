import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from '../Features/ProductSlice'; 
import cartReducer from '../Features/CartSlice';
import authReducer from '../Features/AuthSlice'
const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: cartReducer,
    auth: authReducer
  }
});

export default store;