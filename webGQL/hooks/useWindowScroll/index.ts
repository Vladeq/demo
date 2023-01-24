import { useEffect, useState } from 'react';

const useWindowScroll = () => {
  const [scroll, setScroll] = useState({ scrollX: 0, scrollY: 0 });

  useEffect(() => {
    const onScroll = () => setScroll({ scrollX: window?.scrollX, scrollY: window?.scrollY });

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return scroll;
};

export default useWindowScroll;
