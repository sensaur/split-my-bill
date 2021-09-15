/* eslint-disable no-unneeded-ternary */
const initState = {
  user: null,
  loader: false,
  listInputs: [],
  currentBill: {},
  error: false,
  myPart: [],
};

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'));
  return stateFromLS ? stateFromLS : initState;
};

export default getInitState;
