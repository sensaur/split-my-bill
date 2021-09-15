/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const myPartSlice = createSlice({
  name: 'myPart',
  initialState: getInitState().myPart,
  reducers: {
    setMyPartSlice(state, action) {
      return state = [...state, action.payload];
    },
    resetMyPartSlice(state) {
      return state = [];
    },
  },
});

export const { setMyPartSlice, resetMyPartSlice } = myPartSlice.actions;
export default myPartSlice.reducer;
