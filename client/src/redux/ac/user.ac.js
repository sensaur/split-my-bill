import * as endPoints from '../../config/endPoints';
import { setUserSlice, deleteUserSlice } from '../slices/userSlice';
import { enableLoaderSlice, disableLoaderSlice } from '../slices/loaderSlice';
import { deleteErrorSlice, setErrorSlice } from '../slices/errorSlice';

export const getUserFromServer = (id) => async (dispatch) => {
  dispatch(enableLoaderSlice());
  const response = await fetch(endPoints.getUser(id), {
    credentials: 'include',
  });
  if (response.status === 200) {
    const currentUser = await response.json();
    dispatch(setUserSlice(currentUser));
  }
  dispatch(disableLoaderSlice());
};

export const signUp = (payload, history) => async (dispatch) => {
  dispatch(enableLoaderSlice());
  const response = await fetch(endPoints.signUp(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUserSlice(user));
    dispatch(deleteErrorSlice());
    history.push('/');
  } else {
    dispatch(setErrorSlice());
  }
  dispatch(disableLoaderSlice());
};

export const signIn = (payload, history) => async (dispatch) => {
  dispatch(enableLoaderSlice());
  const response = await fetch(endPoints.signIn(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(payload),
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUserSlice(user));
    dispatch(deleteErrorSlice());
    history.push('/');
  } else {
    dispatch(setErrorSlice());
  }
  dispatch(disableLoaderSlice());
};

export const signOut = () => async (dispatch) => {
  const response = await fetch(endPoints.signOut(), {
    credentials: 'include',
  });
  if (response.status === 200) {
    dispatch(deleteUserSlice());
  }
};

export const checkAuth = () => async (dispatch) => {
  const response = await fetch(endPoints.checkAuth(), {
    credentials: 'include',
  });
  if (response.status === 200) {
    const user = await response.json();
    dispatch(setUserSlice(user));
  }
};
