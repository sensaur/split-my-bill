/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const errorSlice = createSlice({
  name: 'error',
  initialState: getInitState().error,
  reducers: {
    setErrorSlice(state) {
      return (state = true);
    },
    deleteErrorSlice(state) {
      return (state = false);
    },
  },
});

export const { setErrorSlice, deleteErrorSlice } = errorSlice.actions;
export default errorSlice.reducer;
