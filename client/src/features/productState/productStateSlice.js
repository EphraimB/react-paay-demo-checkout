import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editMode: [],
  deleteMode: []
}

export const productsStateSlice = createSlice({
  name: 'productsState',
  initialState,
  reducers: {
    viewModeAction: (state, action) => {
      state.editMode.splice(action.payload, 1);
      state.deleteMode.splice(action.payload, 1);
    },
    editModeAction: (state, action) => {
      state.deleteMode.splice(action.payload, 1);
      state.editMode.push(action.payload);
    },
    deleteModeAction: (state, action) => {
      state.editMode.splice(action.payload, 1);
      state.deleteMode.push(action.payload);
    },
  },
})

export const { viewModeAction, editModeAction, deleteModeAction } = productsStateSlice.actions;
export default productsStateSlice.reducer;