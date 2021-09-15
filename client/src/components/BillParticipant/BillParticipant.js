/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as endPoints from '../../config/endPoints';

const BillParticipant = ({ billId }) => {
  const [allParticipants, setAllParticipants] = useState([]);
  const [allSubItems, setlAllSubItems] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios.get(endPoints.getParticipants(billId))
      .then((res) => setAllParticipants(res.data));

    return setFlag(false);
  }, []);

  const allColors = ['#ff6666', '#fff25c', '#03fe99', '#01cafc', '#9933ff'];

  const getSubItemsForUser = (e) => {
    const user_id = e.target.id;
    axios.post(endPoints.getSubItems, { bill_id: billId, user_id })
      .then((res) => {
        if (res.data.length) {
          setlAllSubItems(res.data);
          setFlag(true);
        }
      });
  };

  return (
    <div>
      <ul className="list-group-item d-flex align-items-center">
        {allParticipants.map((el) => <button style={{ border: `${allColors[Math.floor(Math.random() * allColors.length)]} solid 1px` }} id={el.id} onClick={getSubItemsForUser} key={Math.random()} className="btn btn-primary btn-sm mx-1" type="button">{el.userName}</button>)}
      </ul>
      {flag && (
      <div className="list-group-item d-flex justify-content-between align-items-center">
        <span>Имя:</span>
        <span>Сумма:</span>
      </div>
      )}
      {allSubItems.map((el) => (
        <span className="list-group-item d-flex justify-content-between align-items-center" key={Math.random()}>
          <p>{el.Item.name}</p>
          {' '}
          <p>
            {el.sum}
            {' '}
            ₽
          </p>
        </span>
      ))}
      {flag && (
      <span style={{ color: 'white' }}>
        Всего:
        {' '}
        {allSubItems.map((el) => el.sum).reduce((a, b) => a + b)}
        {' '}
        ₽
      </span>
      )}
    </div>
  );
};

export default BillParticipant;
