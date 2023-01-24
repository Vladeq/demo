import { useCallback, useEffect, useState } from 'react';
import { BreakpointsEnum, BreakpointsType } from 'types';

const useClientSize = () => {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const getIsBreakpoint = (breakpoint: BreakpointsType) => {
    if (!width) return false;

    const breakpointWidth = BreakpointsEnum[breakpoint];

    return breakpointWidth >= width;
  };

  const getBreakpoint = useCallback(
    (screenWidth?: number): BreakpointsType | null => {
      const targetWidth = screenWidth || width || 0;

      const enums = Object.keys(BreakpointsEnum) as BreakpointsType[];

      const targetEnum = enums.find((enumItem) => targetWidth >= BreakpointsEnum[enumItem]);

      if (!targetEnum || !targetWidth) return null;

      return targetEnum;
    },
    [height, width],
  );

  useEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth || undefined);
      setHeight(document.documentElement.clientHeight || undefined);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { width, height, getIsBreakpoint, getBreakpoint };
};

export default useClientSize;
