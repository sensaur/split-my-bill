import { combineReducers } from 'redux';
import userSlice from '../slices/userSlice';
import loaderSlice from '../slices/loaderSlice';
import inputsSlice from '../slices/inputsSlice';
import billSlice from '../slices/billSlice';
import errorSlice from '../slices/errorSlice';
import myPartSlice from '../slices/myPart.slice';

const rootReducer = combineReducers({
  user: userSlice,
  loader: loaderSlice,
  listInputs: inputsSlice,
  currentBill: billSlice,
  error: errorSlice,
  myPart: myPartSlice,
});

export default rootReducer;
