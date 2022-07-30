import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal: (state, action) => {
      if (action.payload.type === "open") {
        state.isOpen = true;
      } else {
        state.isOpen = false;
      }
    },
  },
});

console.log(modalSlice);

export const { toggleModal } = modalSlice.actions;
export default modalSlice.reducer;
