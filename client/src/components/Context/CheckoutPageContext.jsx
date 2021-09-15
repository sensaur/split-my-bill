import { createContext, useContext, useState } from 'react';

const InputContext = createContext();

function InputContextProvider({ children }) {
  const [inputValue, setInputValue] = useState();
  const [mySum, setMySum] = useState(0);
  const [progressBarStatus, setProgressBarStatus] = useState(2);
  const [totalSum, setTotalSum] = useState(0);

  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const changeProgressBarHandler = () => {
    const result = ((mySum * 100) / totalSum);
    setProgressBarStatus(result);
  };

  const changeMySumHandler = () => {
    setMySum((prev) => prev + Number(inputValue));
    setInputValue('');
  };

  return (
    <InputContext.Provider value={{
      inputValue,
      setInputValue,
      changeHandler,
      changeMySumHandler,
      mySum,
      setMySum,
      progressBarStatus,
      setProgressBarStatus,
      changeProgressBarHandler,
      setTotalSum,
      totalSum,
    }}
    >
      {children}
    </InputContext.Provider>
  );
}

const useInputContext = () => useContext(InputContext);

export default InputContextProvider;
export { useInputContext };
