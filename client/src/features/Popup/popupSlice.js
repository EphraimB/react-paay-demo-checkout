import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
}

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    show: (state) => {
        state.show = true;
    },
    hide: (state) => {
        state.show = false;
    },
  },
})

export const { show, hide } = popupSlice.actions;
export default popupSlice.reducer;