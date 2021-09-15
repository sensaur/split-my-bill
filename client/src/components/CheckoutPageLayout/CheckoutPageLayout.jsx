/* eslint-disable camelcase */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-named-as-default */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router';
import OnePosition from '../OnePosition/OnePosition';
import { useInputContext } from '../Context/CheckoutPageContext';
import * as endPoints from '../../config/endPoints';
import './CheckoutPage.css';
// import { resetBillSlice } from '../../redux/slices/billSlice';

const CheckoutPageLayout = () => {
  const {
    mySum, setMySum, changeProgressBarHandler, progressBarStatus, totalSum, setTotalSum,
  } = useInputContext();
  const myPart = useSelector((state) => state.myPart);
  const history = useHistory();
  // const dispatch = useDispatch();

  const list = useSelector((state) => state.currentBill);

  const clearDataHandler = () => {
    setMySum(0);
  };

  useEffect(() => {
    const dbSum = list?.Items?.map((el) => el.sum);
    const dbSumSum = dbSum?.reduce((acc, el) => acc + el);
    setTotalSum(dbSumSum);

    return (() => {
      setMySum(0);
    });
  }, [totalSum, list?.Items?.length]);

  const submitMyPart = () => {
    axios.post(endPoints.addSubItems, { myPart })
      .then(history.push('/success'));
  };

  return (

    <div className="checkout-page-container">
      <div className="m fs-3">
        Ваш код:
        {' '}
        <b>
          {list.code}
        </b>
      </div>
      <div className="progress progress-edit">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${progressBarStatus}%` }} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" />
      </div>

      <div className="list-group-item d-flex justify-content-between align-items-center progress-edit">
        <span className="badge bg-primary rounded-pill fs-5">
          Я внёс:
          {' '}
          {mySum}
          р
        </span>
        <button className="btn btn-primary btn-sm" onClick={() => { clearDataHandler(); }}>Сброс</button>
        <span className="badge bg-primary rounded-pill fs-5">
          Сумма к оплате всего:
          {' '}
          {totalSum}
          р
        </span>
      </div>
      <div className="list-group-item d-flex align-items-center">
        <span className="list-group-checkout-page-position">Позиция:</span>
        <span className="list-group-checkout-page-price">Цена:</span>
        <span className="list-group-checkout-page-number">Кол-во:</span>
        <span className="list-group-checkout-page-sum">Сумма:</span>
        <span className="list-group-checkout-page-current">Внесено:</span>
      </div>

      <ul className="list-group progress-edit">
        {list?.Items?.map((el) => (
          <li key={el.id} style={{ listStyleType: 'none' }}>
            <OnePosition id={el.id} {...el} />
          </li>
        ))}
      </ul>
      <button type="button" onClick={(e) => { e.preventDefault(); changeProgressBarHandler(); submitMyPart(); }} className="btn btn-primary btn-lg">Подтвердить</button>

    </div>
  );
};

export default CheckoutPageLayout;
