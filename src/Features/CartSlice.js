import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState ={
  cartItems : savedCart,
};

const saveToLocalStorage = (state) =>{
  localStorage.setItem("cart", JSON.stringify(state.cartItems))
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers:{
    addToCart:(state,action)=>{
      const item =action.payload;
      const existing = state.cartItems.find((i)=>i.id ===item.id);

      if(existing){
        existing.quantity += 1;
      }else{
        state.cartItems.push({...item, quantity:1});
      }

      saveToLocalStorage(state);
    },

    removeFromCart:(state, action)=>{
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state);
    },

    updateQuantity:(state,action) =>{
      const { id,quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if(item && quantity >0){
        item.quantity = quantity;
      }
      saveToLocalStorage(state);
    },
    clearCart:(state)=>{
      state.cartItems =[];
      saveToLocalStorage(state)
    }
  }

});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;