import { useEffect, useRef, useState } from 'react';

const useTimer = () => {
  const [timer, setTimer] = useState(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer > 0) {
      timerId.current = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, [timer]);

  return { timer, timerId, setTimer };
};

export default useTimer;
