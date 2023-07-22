import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload.cartItem;
    },
    deleteCartItem: (state, action) => {
      const itemId = action.payload.productId;
      state.cartItems = state.cartItems.filter((item) => item.productId._id !== itemId);
    },
  },
});

export const { setCart, deleteCartItem } = cartSlice.actions;

export default cartSlice.reducer;