/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const inputsSlice = createSlice({
  name: 'inputs',
  initialState: getInitState().listInputs,
  reducers: {
    setInputsSlice(state, action) {
      return state = [...state, action.payload]; // разобраться почему не push
    },
    changeInputsSlice(state, action) {
      return state.map((item, index) => {
        if (index === action.payload.id) {
          return { ...item, [action.payload.name]: action.payload.value };
        } return item;
      });
    },
    deleteInputsSlice(state, action) {
      return state.filter((item, index) => index !== action.payload);
    },
    resetInputsSlice(state) {
      return state = [];
    },
  },
});

export const {
  setInputsSlice, changeInputsSlice, deleteInputsSlice, resetInputsSlice,
} = inputsSlice.actions;
export default inputsSlice.reducer;
