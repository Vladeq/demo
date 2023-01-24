import { useCallback, useState } from 'react';

interface useToggleReturn {
  isOpened: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

function useToggle(initial = false): useToggleReturn {
  const [isOpened, setIsOpened] = useState(initial);
  const toggle = useCallback(() => {
    setIsOpened((prevState) => !prevState);
  }, []);
  const open = useCallback(() => setIsOpened(true), [setIsOpened]);
  const close = useCallback(() => setIsOpened(false), [setIsOpened]);
  return { isOpened, toggle, open, close };
}

export default useToggle;
