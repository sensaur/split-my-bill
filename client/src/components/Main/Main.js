/* eslint-disable camelcase */
import './style.css';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { connectUserToBillStart } from '../../redux/ac/inputs.ac';
import logostatic from '../video/split-my-bill-3.gif';
import { resetBillSlice } from '../../redux/slices/billSlice';
import { deleteErrorSlice } from '../../redux/slices/errorSlice';
import indexvideo from '../video/indexvideo.mp4';

const Main = () => {
  const [flag, setFlag] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const video = useRef(null);
  const error = useSelector((state) => state.error);

  const connectUserToBill = (e) => {
    e.preventDefault();
    const user_id = user.id;
    const bill_id = e.target.billInput.value.trim();
    dispatch(connectUserToBillStart(user_id, bill_id, history));
  };
  useEffect(() => {
    dispatch(resetBillSlice());
    dispatch(deleteErrorSlice());
  }, []);

  return (
    <div className="d-flex flex-column align-items-center">
      <img style={{ height: 150 }} src={logostatic} alt="logo" />
      {user
        ? (
          <div className="d-flex flex-column">
            <div>
              <button type="button" className="btn btn-primary btn-lg mx-2" onClick={() => history.push('/add')}> Создать чек </button>
              <button
                className="btn btn-primary btn-lg"
                type="button"
                onClick={() => {
                  setFlag(!flag);
                  if (!flag) {
                    dispatch(deleteErrorSlice());
                  }
                }}
              >
                Подключиться к чеку
              </button>
            </div>
            {flag ? (
              <form onSubmit={connectUserToBill} className="d-flex flex-column">
                <div className="form-group d-flex align-items-center">
                  {' '}
                  <input type="text" required name="billInput" className="form-control m-2 text-light" placeholder="введите код" />
                  {' '}
                  <button className="btn btn-primary btn-lg" type="submit">
                    Ввод
                  </button>
                  {' '}
                </div>
                <div className="align-self-center fs-5" style={{ color: 'red' }}>
                  {error && <span><b>Чек не найден</b></span>}
                </div>
              </form>
            ) : <p />}
          </div>
        )
        : <p />}
      <div className="backgroundLeft">
        <video
          preload="auto"
          autoPlay
          loop
          muted
          ref={video}
          style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        >
          <source src={indexvideo} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default Main;
