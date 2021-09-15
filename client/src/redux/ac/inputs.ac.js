/* eslint-disable camelcase */
import axios from 'axios';
import {
  changeInputsSlice, setInputsSlice, deleteInputsSlice, resetInputsSlice,
} from '../slices/inputsSlice';
import * as endPoints from '../../config/endPoints';
import { setBillSlice } from '../slices/billSlice';
import { setErrorSlice } from '../slices/errorSlice';

export const addInputStart = (obj) => (dispatch) => {
  dispatch(setInputsSlice(obj));
};

export const changeInputValueStart = (id, name, value) => (dispatch) => {
  dispatch(changeInputsSlice({ id, name, value }));
};

export const deleteInputStart = (id) => (dispatch) => {
  dispatch(deleteInputsSlice(id));
};

export const resetInputsStart = () => (dispatch) => {
  dispatch(resetInputsSlice());
};

export const submitAllInputsStart = (listInputs, name, userId) => async (dispatch) => {
  const list = listInputs;
  const user_id = userId;
  const response = await fetch(endPoints.addBill(),
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ list, name, user_id }),
    });
  const bill = await response.json();
  dispatch(setBillSlice(bill));
};

export const connectUserToBillStart = (user_id, bill_id, history) => async (dispatch) => {
  axios
    .post(endPoints.connectUserToBill, { user_id, bill_id })
    .then((res) => {
      if (res.data) {
        dispatch(setBillSlice(res.data));
        history.push('/CheckoutPageLayout');
      } else {
        dispatch(setErrorSlice());
      }
    });
};
