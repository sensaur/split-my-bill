/* eslint-disable import/no-unresolved */
import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import foodAnimation from '../../animations/food.json';

const Food = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      animationData: foodAnimation,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div style={{ width: 40, height: 40 }} ref={anime} />
  );
};

export default Food;
