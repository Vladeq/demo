import { isClientSide } from 'constains';
import { useEffect, useRef, useState } from 'react';

export const IS_NOT_HOVER = ' isNotHover';

const useSelectingDay = (areTwoMonth: boolean) => {
  const [rangeStartDay, setRangeStartDay] = useState(0);
  const firstMonthRef = useRef<HTMLDivElement>(null);

  const enterOnFirstMonth = () => {
    if (firstMonthRef.current) {
      firstMonthRef.current.className = firstMonthRef.current.className.replace(IS_NOT_HOVER, '');
    }
  };
  const leaveFromFirstMonth = () => {
    if (firstMonthRef.current) {
      firstMonthRef.current.className += IS_NOT_HOVER;
    }
  };

  useEffect(() => {
    firstMonthRef.current?.addEventListener('mouseenter', enterOnFirstMonth);
    firstMonthRef.current?.addEventListener('mouseleave', leaveFromFirstMonth);

    return () => {
      firstMonthRef.current?.removeEventListener('mouseenter', enterOnFirstMonth);
      firstMonthRef.current?.removeEventListener('mouseleave', leaveFromFirstMonth);
    };
  });

  useEffect(() => {
    if (isClientSide) {
      setRangeStartDay(
        +(((document.getElementsByClassName('react-datepicker__day--selecting-range-start')[0] as any)?.innerText ||
          '') as string),
      );
    }
  });

  const isSelecting = !!(rangeStartDay && areTwoMonth);

  return { isSelecting, rangeStartDay, firstMonthRef };
};

export default useSelectingDay;
