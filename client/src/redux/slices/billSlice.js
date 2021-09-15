/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const billSlice = createSlice({
  name: 'bill',
  initialState: getInitState().currentBill,
  reducers: {
    setBillSlice(state, action) {
      return state = action.payload;
    },
    resetBillSlice(state) {
      return state = {};
    },
  },
});

export const { setBillSlice, resetBillSlice } = billSlice.actions;
export default billSlice.reducer;
