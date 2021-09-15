const { REACT_APP_HOST: host } = process.env;

export const signUp = () => `${host}/api/v1/auth/signup`;
export const signIn = () => `${host}/api/v1/auth/signin`;
export const signOut = () => `${host}/api/v1/auth/signout`;
export const checkAuth = () => `${host}/api/v1/auth/check`;
export const getUser = (id) => `${host}/api/v1/users/${id}`;
export const addBill = () => `${host}/api/v1/bill`;
export const getBill = (id) => `${host}/api/v1/bill/${id}`;
export const uploadImg = `${host}/api/v1/uploadimg`;
export const connectUserToBill = `${host}/api/v1/bill/connect`;
export const getSubTotal = (id) => `${host}/api/v1/bill/item/${id}`;
export const addSubItems = `${host}/api/v1/bill/item/`;
export const deleteSubs = `${host}/api/v1/bill/item/delete`;
export const getSubItems = `${host}/api/v1/bill/subitems`;
export const getParticipants = (id) => `${host}/api/v1/bill/users/${id}`;
export const editItem = (id) => `${host}/api/v1/bill/item/${id}`;
