/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const loaderSlice = createSlice({
  name: 'loader',
  initialState: getInitState().loader,
  reducers: {
    enableLoaderSlice(state) {
      return (state = true);
    },
    disableLoaderSlice(state) {
      return (state = false);
    },
  },
});

export const { enableLoaderSlice, disableLoaderSlice } = loaderSlice.actions;
export default loaderSlice.reducer;
