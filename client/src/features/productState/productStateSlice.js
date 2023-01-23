import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mode: 0
}

export const productsStateSlice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {
    viewMode: (state) => {
        state.mode = 0;
    },
    editMode: (state) => {
        state.mode = 1;
    },
    deleteMode: (state) => {
        state.mode = 2;
    },
  },
})

export const { viewMode, editMode, deleteMode } = productsStateSlice.actions;
export default productsStateSlice.reducer;