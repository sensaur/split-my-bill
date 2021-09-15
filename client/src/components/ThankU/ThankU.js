import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { resetMyPartSlice } from '../../redux/slices/myPart.slice';

const ThankU = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => history.push(`/users/${user.id}`), 2500);
    dispatch(resetMyPartSlice());
  }, []);
  return (
    <div>
      Спасибо, ваш чек обновлен!
    </div>
  );
};

export default ThankU;
