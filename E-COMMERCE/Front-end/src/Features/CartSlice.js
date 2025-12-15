
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
  cartItems: savedCart,
  loading: false,
  error: null,
};

// 1) Add / update item on server
export const syncCartItem = createAsyncThunk(
  "cart/syncCartItem",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/cart", { productId, quantity });
      return res.data; // e.g. updated cartItems from backend
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Cart update failed");
    }
  }
);

// 2) Remove item on server
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/cart/${productId}`);
      return productId;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Cart remove failed");
    }
  }
);

// 3) Clear cart on server
export const clearCartOnServer = createAsyncThunk(
  "cart/clearCartOnServer",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete("/api/cart");
      return;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Clear cart failed");
    }
  }
);

const saveToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.cartItems));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // you can keep these for offline/local behavior if you want
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }

      saveToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
      saveToLocalStorage(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      saveToLocalStorage(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCartItem.fulfilled, (state, action) => {
        state.loading = false;
        // Option A: backend returns full cart array
        // state.cartItems = action.payload;

        // Option B: backend returns single item; then you merge it:
        const updatedItem = action.payload;
        const existing = state.cartItems.find((i) => i.id === updatedItem.id);
        if (existing) {
          existing.quantity = updatedItem.quantity;
        } else {
          state.cartItems.push(updatedItem);
        }
        saveToLocalStorage(state);
      })
      .addCase(syncCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
        saveToLocalStorage(state);
      })
      .addCase(clearCartOnServer.fulfilled, (state) => {
        state.cartItems = [];
        saveToLocalStorage(state);
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;


















// import { createSlice } from "@reduxjs/toolkit";

// const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

// const initialState ={
//   cartItems : savedCart,
// };

// const saveToLocalStorage = (state) =>{
//   localStorage.setItem("cart", JSON.stringify(state.cartItems))
// }

// const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers:{
//     addToCart:(state,action)=>{
//       const item =action.payload;
//       const existing = state.cartItems.find((i)=>i.id ===item.id);

//       if(existing){
//         existing.quantity += 1;
//       }else{
//         state.cartItems.push({...item, quantity:1});
//       }

//       saveToLocalStorage(state);
//     },

//     removeFromCart:(state, action)=>{
//       state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
//       saveToLocalStorage(state);
//     },

//     updateQuantity:(state,action) =>{
//       const { id,quantity } = action.payload;
//       const item = state.cartItems.find((i) => i.id === id);
//       if(item && quantity >0){
//         item.quantity = quantity;
//       }
//       saveToLocalStorage(state);
//     },
//     clearCart:(state)=>{
//       state.cartItems =[];
//       saveToLocalStorage(state)
//     }
//   }

// });

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;