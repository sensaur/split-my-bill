/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/button-has-type */
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useInputContext } from '../Context/CheckoutPageContext';
import * as endPoints from '../../config/endPoints';
import { setMyPartSlice } from '../../redux/slices/myPart.slice';

const OnePosition = ({
  name, price, number, sum, id,
}) => {
  const {
    inputValue, changeHandler, setMySum, setInputValue, mySum,
  } = useInputContext();

  const [isInputShown, setIsInputShown] = useState(false);
  const [isInputItemShown, setIsInputItemShown] = useState(false);
  const [nameItem, setNameItem] = useState(name);
  const [currentEnter, setCurrentEnter] = useState(0);
  const user = useSelector((state) => state.user);
  const subItemInput = useRef();
  const dispatch = useDispatch();

  const showInputHandler = () => {
    setIsInputShown((prev) => !prev);
  };
  const showInputItemHandler = () => {
    setIsInputItemShown((prev) => !prev);
  };
  const changeMyAllSumHandler = () => {
    setMySum((prev) => prev + sum);
    setCurrentEnter((prev) => prev + sum);
  };

  const changeNameItemHandler = () => {
    axios.put(endPoints.editItem(id), { nameItem });
    setInputValue('');
  };

  const changeMySumHandler = () => {
    setCurrentEnter((prev) => prev + Number(inputValue));
    setMySum((prev) => prev + Number(inputValue));
    setInputValue('');
  };

  const addSubItem = (e) => {
    const user_id = user.id;
    let partSum;
    if (e.target.id === 'allmy') {
      partSum = sum;
    } else {
      partSum = subItemInput.current.value;
    }
    const item_id = id;
    dispatch(setMyPartSlice({ item_id, sum: partSum, user_id }));
  };

  useEffect(() => {
    if (mySum === 0) {
      axios
        .get(endPoints.getSubTotal(id))
        .then((res) => {
          setCurrentEnter(res.data.sum);
        });
    }
  }, [mySum]);

  return (
    <form>
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column align-items-center" style={{ width: '200px' }}>
          <span onClick={() => { showInputItemHandler(); }}>{nameItem}</span>
          {isInputItemShown && (
          <div className="d-flex align-items-center" style={{ width: '150px' }}>
            <input name="partValueInput" value={nameItem} onChange={(e) => setNameItem(e.target.value)} style={{ width: '100px', marginLeft: '10px' }} />
            <button onClick={(e) => { e.preventDefault(); changeNameItemHandler(id); showInputItemHandler(); }} className="btn btn-primary btn-sm">✔</button>
          </div>
          )}
        </div>
        <span style={{ width: '100px' }}>
          {price}
          {' '}
          ₽
        </span>
        <span style={{ width: '100px' }}>{number}</span>
        <span style={{ width: '100px' }}>
          {sum}
          {' '}
          ₽
        </span>
        <span style={{ width: '100px' }}>
          {currentEnter}
          {' '}
          ₽
        </span>
        <div>
          <button type="button" onClick={(e) => { e.preventDefault(); changeMyAllSumHandler(); addSubItem(e); }} id="allmy" className="btn btn-primary btn-lg button-layout">Всё моё</button>
          {!isInputShown && (
          <button type="button" onClick={showInputHandler} style={{ margin: '10px' }} className="btn btn-primary btn-lg button-layout">Часть моя</button>
          )}
        </div>
        {isInputShown && (
        <div className="d-flex justify-content-between align-items-center">
          <input ref={subItemInput} value={inputValue} onChange={changeHandler} name="partValueInput" style={{ width: '70px' }} />
          <button onClick={(e) => { e.preventDefault(); changeMySumHandler(); showInputHandler(); addSubItem(e); }} className="btn btn-primary btn-sm mx-2">✔</button>
        </div>
        )}
      </div>
    </form>
  );
};

export default OnePosition;
