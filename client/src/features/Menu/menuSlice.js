import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
}

export const menuSlice = createSlice({
  name: 'menu',
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

export const { show, hide } = menuSlice.actions;
export default menuSlice.reducer;