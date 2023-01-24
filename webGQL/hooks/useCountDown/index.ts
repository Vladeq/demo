import { useEffect, useState } from 'react';

const useCountdown = (seconds: number, index: number) => {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const isExpired = secondsLeft > 0;

  useEffect(() => {
    setSecondsLeft(seconds);
  }, [seconds, index]);

  useEffect(() => {
    if (isExpired) {
      const timeInterval = setInterval(() => {
        setSecondsLeft((lastValue) => lastValue - 1);
      }, 1000);

      return () => {
        clearInterval(timeInterval);
        setSecondsLeft(0);
      };
    }
  }, [isExpired]);

  if (secondsLeft > 9) {
    return secondsLeft;
  }
  return `0${secondsLeft}`;
};

export default useCountdown;
