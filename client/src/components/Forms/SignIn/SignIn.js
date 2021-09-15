import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signIn } from '../../../redux/ac/user.ac';
import { deleteErrorSlice } from '../../../redux/slices/errorSlice';
import style from './SignIn.module.css';

const SignIn = () => {
  const [userSignIn, setUserSignIn] = useState({
    email: '',
    password: '',
  });

  const error = useSelector((state) => state.error);

  const history = useHistory();

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userSignIn).filter((el) => (el[1] ? el[1].trim() : el[1]));
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signIn(payload, history));
    }
  };
  useEffect(() => dispatch(deleteErrorSlice()), []);

  return (
    <div className={`d-flex justify-content-center ${style.formGroup}`}>
      <form
        onSubmit={submitHandler}
        className={`${style.form} d-flex mt-2 flex-column align-items-center`}
      >
        <div className="mb-3" style={{ width: '80%' }}>
          <input
            onChange={changeHandler}
            className={style.input}
            value={userSignIn.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3" style={{ width: '80%' }}>
          <input
            onChange={changeHandler}
            value={userSignIn.password}
            className={style.input}
            type="password"
            name="password"
            placeholder="Пароль"
          />
        </div>
        {error && <span className={style.error}>Не правильный имейл или пароль</span>}
        <button type="submit" className={style.button}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default SignIn;
