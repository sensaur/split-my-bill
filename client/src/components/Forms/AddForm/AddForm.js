/* eslint-disable no-plusplus */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';
import { fadeIn } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { useHistory } from 'react-router';
import { addInputStart, resetInputsStart, submitAllInputsStart } from '../../../redux/ac/inputs.ac';
import AddInput from '../AddInput/AddInput';
import UploadImg from '../../UploadImg/UploadImg';
import { deleteErrorSlice } from '../../../redux/slices/errorSlice';

const AddForm = () => {
  const listInputs = useSelector((state) => state.listInputs);
  const [flag, setFlag] = useState(false);
  const userId = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [startButton, setStartButton] = useState(true);
  const [endButton, setEndButton] = useState(false);
  const FadeIn = styled.div`animation: 1s ${keyframes`${fadeIn}`}`;

  function allInputs() {
    dispatch(addInputStart({
      name: '', price: '', sum: 0, number: 1,
    }));
  }

  const start = () => {
    allInputs();
    setStartButton(false);
    setEndButton(true);
  };
  const submitBill = (e) => {
    e.preventDefault();
    const name = e.target.billName.value;
    dispatch(submitAllInputsStart(listInputs, name, userId));
    history.push('/CheckoutPageLayout');
  };

  const changHandler = (e) => {
    e.preventDefault();
    setFlag(!flag);
    setStartButton(!startButton);
    if (!flag) {
      dispatch(deleteErrorSlice());
    }
  };

  useEffect(() => {
    dispatch(resetInputsStart());
  }, []);

  let total = 0;
  for (let i = 0; i < listInputs.length; i++) {
    total += listInputs[i].sum;
  }

  return (
    <div className="form-group d-flex flex-column align-items-center">
      <form onSubmit={submitBill}>
        <FadeIn>
          {startButton && (
          <div>
            <button onClick={start} type="button" className="btn btn-primary">Добавить чек вручную</button>
            <button type="button" className="btn btn-primary mx-2" onClick={changHandler}>Загрузить изоображение</button>
          </div>
          )}

        </FadeIn>
        {flag ? (
          <div className="mx-2">
            <button type="button" className="btn text-white my-3 btn btn-primary btn-sm" onClick={changHandler}>Назад</button>
            {' '}
            <UploadImg />
            {' '}
          </div>
        ) : <p />}
        {endButton && (
          <div className="d-flex form-group flex-column align-items-start justify-content-between mb-3 mx-2">
            <button
              type="button"
              className="btn text-white my-3 btn btn-primary btn-sm"
              onClick={() => {
                setStartButton(!startButton);
                setEndButton(!endButton);
                dispatch(resetInputsStart());
              }}
            >
              Назад
            </button>
            <div className="d-flex align-items-end form-group">
              <div>
                <label htmlFor="inputBillName" className="form-label mt-3 mb-1">Название чека</label>
                <input required type="text" className="form-control text-light" id="inputBillName" name="billName" placeholder="придумайте название чеку" />
              </div>
              <button
                onClick={allInputs}
                type="button"
                className="btn btn-primary btn-lg mx-2"
              >
                +
              </button>
            </div>
          </div>
        ) }

        {listInputs?.map((el, i) => <AddInput key={i} id={i} {...el} />)}

        {endButton
          && (
          <div className="text-underline my-2 mx-2">
            <span className="text-underline">
              <span style={{ color: 'white' }}>
                {' '}
                Общая сумма:
              </span>
              {' '}
            </span>
            <span>
              <b>
                {total}
                {' '}
                ₽
              </b>
            </span>
            <FadeIn>
              <button type="submit" className="btn text-white my-3 btn btn-primary btn-sm">Завершить</button>
            </FadeIn>
          </div>
          )}
      </form>
    </div>
  );
};
export default AddForm;
