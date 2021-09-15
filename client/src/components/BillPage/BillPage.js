/* eslint-disable no-plusplus */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled, { keyframes } from 'styled-components';
import { fadeInDown, fadeIn } from 'react-animations';
import { disableLoaderSlice, enableLoaderSlice } from '../../redux/slices/loaderSlice';
import * as endPoints from '../../config/endPoints';
import Loader from '../Loader/Loader';
import BillParticipant from '../BillParticipant/BillParticipant';

const BillPage = () => {
  const { id } = useParams();
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const [bill, setBill] = useState({});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(enableLoaderSlice());
    axios
      .get(endPoints.getBill(id), {
        credentials: 'include',
      })
      .then((res) => {
        setBill(res.data);
        let totalForBill = 0;
        for (let i = 0; i < res.data.Items.length; i++) {
          totalForBill += res.data.Items[i].sum;
        }
        setTotal(totalForBill);
      })
      .finally(() => dispatch(disableLoaderSlice()));
  },
  []);

  const FadeInDown = styled.div`animation: 1s ${keyframes`${fadeInDown}`}`;
  const FadeIn = styled.div`animation: 2s ${keyframes`${fadeIn}`}`;

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <FadeIn>
            <div className="d-flex flex-column">
              <div>
                <span style={{ color: 'white' }}>Код чека: </span>
                <span>
                  <b style={{ color: 'white' }}>
                    {bill?.code}
                  </b>
                </span>
              </div>
              <div>
                <span style={{ color: 'white' }}>Назввание чека: </span>
                <span>
                  <b style={{ color: 'white' }}>
                    {bill?.name}
                  </b>
                </span>
              </div>
              <div>
                <span style={{ color: 'white' }}>Дата: </span>
                <span>
                  <b>
                    {bill?.createdAt?.substring(0, 10)}
                  </b>
                </span>
              </div>
            </div>
          </FadeIn>
          <div className="list-group-item d-flex justify-content-between align-items-center">
            <span className="m-2" style={{ width: '200px' }}>Позиция:</span>
            <span className="m-2" style={{ width: '100px' }}>Цена:</span>
            <span className="m-3" style={{ width: '100px' }}>Количество:</span>
            <span style={{ width: '100px' }}>Сумма:</span>
          </div>
          {bill?.Items?.map((item) => (
            <FadeInDown key={Math.random()}>
              <div className="list-group-item d-flex justify-content-between align-items-center">
                <span className="m-2" style={{ width: '200px' }}>{item.name}</span>
                <span className="m-2" style={{ width: '100px' }}>
                  {item.price}
                  {' '}
                  ₽
                </span>
                <span className="mx-2" style={{ width: '100px' }}>{item.number}</span>
                <span style={{ width: '100px' }}>
                  {item.sum}
                  {' '}
                  ₽
                </span>
              </div>
            </FadeInDown>
          ))}
          <div className="text-underline my-2 d-flex align-items-center justify-content-end">
            <span className="text-underlinev mx-2">
              <span style={{ color: 'white' }}>
                {' '}
                Общая сумма:
              </span>
            </span>
            <span>
              <b>
                {total}
                {' '}
                ₽
              </b>
            </span>
          </div>
          <BillParticipant billId={id} billItems={bill.Items} />
        </div>
      )}
    </div>
  );
};

export default BillPage;
