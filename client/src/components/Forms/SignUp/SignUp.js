import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signUp } from '../../../redux/ac/user.ac';
import { deleteErrorSlice } from '../../../redux/slices/errorSlice';
import style from './SignUp.module.css';

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
    userName: '',
  });

  const history = useHistory();
  const error = useSelector((state) => state.error);

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userSignUp).filter((el) => (el[1] ? el[1].trim() : el[1]));
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signUp(payload, history));
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
            value={userSignUp.email}
            type="email"
            name="email"
            placeholder="Email"
          />
        </div>

        <div className="mb-3" style={{ width: '80%' }}>
          <input
            onChange={changeHandler}
            className={style.input}
            value={userSignUp.userName}
            type="text"
            name="userName"
            placeholder="Имя"
          />
        </div>

        <div className="mb-3" style={{ width: '80%' }}>
          <input
            onChange={changeHandler}
            className={style.input}
            value={userSignUp.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />
        </div>
        {error && <span className={style.error}>Такой email уже зарегистрирован</span>}

        <button type="submit" className={style.button}>
          Зарегистрироваться
        </button>

      </form>
    </div>
  );
};

export default SignUp;
