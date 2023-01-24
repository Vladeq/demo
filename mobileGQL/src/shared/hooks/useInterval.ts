import { useEffect, useRef } from 'react';

const useInterval = (callback: () => void, delay: number) => {
  const savedCallback = useRef<undefined | any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback && savedCallback.current) {
        savedCallback.current();
      }
    }

    let id = setInterval(tick, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export default useInterval;
