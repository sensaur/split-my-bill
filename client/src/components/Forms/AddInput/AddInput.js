/* eslint-disable jsx-a11y/label-has-associated-control */
import { createRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeInputValueStart, deleteInputStart } from '../../../redux/ac/inputs.ac';

const AddInput = ({ id }) => {
  const [sum, setSum] = useState(0);
  const numberSelect = createRef();
  const priceInput = createRef();
  const dispatch = useDispatch();

  const changeSum = () => {
    const price = priceInput.current.value;
    const number = numberSelect.current.value;
    const newSum = price * number;
    setSum(newSum);
    dispatch(changeInputValueStart(id, 'sum', newSum));
  };

  const changeHandler = (target) => {
    const { value, name } = target;
    changeSum();
    dispatch(changeInputValueStart(id, name, value));
  };

  const deleteInput = () => {
    dispatch(deleteInputStart(id));
  };

  return (
    <div className={`d-flex flex-column align-items-center ${id}`} style={{ maxWidth: '750px' }}>
      <div className="d-flex align-items-end">
        <div className="mx-2">
          <label htmlFor="inputName" className="form-label mt-3 mb-1">Позиция</label>
          <input type="text" required onChange={(e) => changeHandler(e.target)} className="form-control text-light" id="inputName" name="name" placeholder="введите блюдо" />
        </div>
        <div className="mx-2">
          <label htmlFor="inputNumber" className="form-label mt-3 mb-1">Стоимость</label>
          <input type="text" required onChange={(e) => changeHandler(e.target)} ref={priceInput} className="form-control text-light" name="price" placeholder="стоимость" />
        </div>
        <div className="mx-2" style={{ maxWidth: '90px' }}>
          <label htmlFor="inputNumber" className="form-label mt-3 mb-1">Количество</label>
          <select className="form-select text-white" onChange={(e) => changeHandler(e.target)} ref={numberSelect} placeholder="количество" name="number" id="inputNumber">
            <option defaultValue="1" value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        <div className="mx-2">
          <label htmlFor="inputSum" className="form-label mt-3 mb-1">Сумма</label>
          <input type="text" onChange={(e) => changeHandler(e.target)} disabled className="form-control text-light" name="sum" id="inputSum" value={sum} placeholder="сумма" />
        </div>
        <button type="button" onClick={deleteInput} className="btn btn-primary btn-lg mx-1">x</button>
      </div>
    </div>
  );
};

export default AddInput;
