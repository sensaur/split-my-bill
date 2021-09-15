import {
  useState, useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useHistory } from 'react-router';
import * as endPoints from '../../config/endPoints';
import { setBillSlice } from '../../redux/slices/billSlice';
import { disableLoaderSlice, enableLoaderSlice } from '../../redux/slices/loaderSlice';
import Loader from '../Loader/Loader';
import { deleteErrorSlice, setErrorSlice } from '../../redux/slices/errorSlice';

function UploadImg() {
  const [img, setImg] = useState('');
  const user = useSelector((state) => state.user);
  const loader = useSelector((state) => state.loader);
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const history = useHistory();
  const onDrop = useCallback((acceptedFiles) => {
    dispatch(enableLoaderSlice());
    if (user) {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('id', user.id);
      axios.post(endPoints.uploadImg, formData)
        .then((res) => {
          const curIMG = res.data.billUrl;
          if (res.data) {
            setImg(curIMG);
            dispatch(setBillSlice(res.data.currentBill));
          }
          return curIMG;
        })
        .then((res) => {
          dispatch(disableLoaderSlice());
          if (res) {
            setTimeout(() => {
              history.push('/checkoutPageLayout');
            }, 1500);
          } else {
            dispatch(setErrorSlice());
            history.push('/add');
          }
        });
    }

    return (dispatch(deleteErrorSlice()));
  }, [user, img]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (

    <section>
      {loader ? (<Loader />)
        : (
          <div className="d-flex flex-column align-items-center mt-4">
            {error && <p style={{ color: 'red' }}><b>Чек не распознан, попробуйте еще раз</b></p>}
            <h2 style={{ color: 'white' }}>Загрузка чека</h2>
            <p>Перетащите чек:</p>

            <div {...getRootProps()} className="border d-flex align-items-end justify-content-end" style={{ width: 300, minHeight: 100, overflow: 'hidden' }}>
              {img && <img src={img} style={{ width: '100%' }} alt="чек" />}
              <input {...getInputProps()} name="imgUpload" type="file" />
              {!img && <button className="btn btn-sm m-1" type="button">Выберите файл</button>}
            </div>
          </div>
        )}

    </section>
  );
}

export default UploadImg;
