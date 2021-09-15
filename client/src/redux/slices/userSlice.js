/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import { createSlice } from '@reduxjs/toolkit';
import getInitState from '../initState';

const userSlice = createSlice({
  name: 'user',
  initialState: getInitState().user,
  reducers: {
    setUserSlice(state, action) {
      return (state = action.payload);
    },
    deleteUserSlice(state) {
      return (state = null);
    },
  },
});

export const { setUserSlice, deleteUserSlice } = userSlice.actions;
export default userSlice.reducer;
