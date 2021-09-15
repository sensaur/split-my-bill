import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import LoaderAnimation from '../../animations/loader.json';

const Loader = () => {
  const anime = useRef(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: anime.current,
      render: 'svg',
      loop: true,
      autoplay: true,
      animationData: LoaderAnimation,
    });
    return () => lottie.stop();
  }, []);
  return (
    <div>
      <div style={{ width: 300, height: 300 }} ref={anime} />
    </div>
  );
};

export default Loader;
