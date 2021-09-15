/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { disableLoaderSlice, enableLoaderSlice } from '../../redux/slices/loaderSlice';
import Loader from '../Loader/Loader';
import * as endPoints from '../../config/endPoints';
import BillLink from '../BillLink/BillLink';

const UserProfile = () => {
  const loader = useSelector((state) => state.loader);
  const user = useSelector((state) => state.user);
  const [allBills, setAllBills] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(enableLoaderSlice());
    if (user) {
      axios
        .get(endPoints.getUser(user.id), {
          credentials: 'include',
        })
        .then((res) => setAllBills(res.data.sort((a, b) => b.id - a.id)))
        .finally(() => dispatch(disableLoaderSlice()));
    }
  }, [user]);
  // console.log(user.userName);

  return (
    <div>
      {loader ? (
        <Loader />
      ) : (
        <div className="d-flex flex-column align-items-center">
          <h3 style={{ color: 'white' }}>
            Добро пожаловать!
          </h3>
          <h1>Ваши чеки:</h1>
          <div className="d-flex align-content-around flex-wrap flex-column " style={{ maxWidth: '800px', maxHeight: '600px' }}>
            {allBills?.map((bill, i) => (
              <div key={i} className="m-2" style={{ maxWidth: '225px' }}>
                <BillLink {...bill} />
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
