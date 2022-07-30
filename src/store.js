import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/cartSlice";
import modalReducer from "./features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    // key : value - key is the name of the reducer, value is the reducer
    cart: cartReducer,
    modal: modalReducer,
  },
});
