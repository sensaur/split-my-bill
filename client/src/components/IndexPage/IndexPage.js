/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useRef } from 'react';
import style from './IndexPage.module.css';
import indexvideo from '../video/indexvideo.mp4';
import logogif from '../video/split-my-bill-1.gif';
import pause from '../video/pause.svg';
import play from '../video/play.svg';
import SignUp from '../Forms/SignUp/SignUp';
import SignIn from '../Forms/SignIn/SignIn';

const IndexPage = () => {
  const [flag, setFlag] = useState(true);
  const [isPlayed, setIsPlayed] = useState(true);
  const video = useRef(null);
  const videoSecond = useRef(null);
  function stopHandler() {
    if (isPlayed) {
      video.current.pause();
      videoSecond.current.pause();
    } else {
      video.current.play();
      videoSecond.current.play();
    }
    setIsPlayed((prev) => !prev);
  }

  return (
    <div className={style.page} name="allPage">
      <div name="left" className={style.left}>
        <img className={style.logo} src={logogif} alt="logo" />
        <label className={style.label}>
          <input onChange={() => setFlag(!flag)} type="checkbox" id="toggle-button" className={style.togglebutton} />
          <span className={style.inputSpan}>{flag ? 'Регистрация' : 'Вход'}</span>
        </label>
        {flag ? <SignIn /> : <SignUp />}
        <div className={style.backgroundLeft}>
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
      <div name="right" className={style.right}>
        <div className={style.backgroundRight}>
          <video
            preload="auto"
            autoPlay
            muted
            loop
            ref={videoSecond}
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
          >
            <source src={indexvideo} type="video/mp4" />
          </video>
        </div>
      </div>

      <button onClick={stopHandler} className={style.stop} type="button">
        {isPlayed ? <img style={{ height: 50 }} src={pause} alt="logo" /> : <img style={{ height: 50 }} src={play} alt="logo" /> }
      </button>
    </div>
  );
};

export default IndexPage;
