import { configureStore } from '@reduxjs/toolkit';
import ProductsReducer from '../Features/ProductSlice'; 
import cartReducer from '../Features/CartSlice';

const store = configureStore({
  reducer: {
    products: ProductsReducer,
    cart: cartReducer
  }
});

export default store;