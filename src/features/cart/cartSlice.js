import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toggleModal } from "../modal/modalSlice";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-projecta";

const initialState = {
  cartItems: [],
  amount: 1,
  total: 0,
  isLoading: true,
};

// createAsyncThunk - creates a thunk that can be used to perform async actions
// it takes in the name of the action, the function that performs the async action,
// export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
//   return fetch(url)
//     .then((response) => response.json())
//     .catch((error) => console.log(error));
// });

export const getCartItems = createAsyncThunk(
  "cart/getCartItems",
  async (name, thunkAPI) => {
    // thunkAPI allows us to access a bunch of useful methods like getState(), dispatch(), rejectWithValue etc.
    console.log(thunkAPI.getState());
    thunkAPI.dispatch(toggleModal({ type: "open" }));

    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      // rejectWithValue - rejects the promise with a value
      //   rejectWithValue can be accessed in the reject lifecycle reject as an action
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  //   action creators - functions that return an action object
  //   whatever is returned from the reducer will be the new state
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleAmount: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (payload.type === "increase") {
        cartItem.amount += 1;
      } else {
        cartItem.amount -= 1;
      }
    },
    calculateTotal: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });
      state.amount = amount;
      state.total = total;
    },
  },

  //   extraReducers is used for lifecycle actions
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
    },
  },
});

export const {
  clearCart,
  removeItem,
  increaseItem,
  toggleAmount,
  calculateTotal,
} = cartSlice.actions;

export default cartSlice.reducer;
