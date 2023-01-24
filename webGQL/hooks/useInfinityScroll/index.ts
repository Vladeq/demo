import { useEffect, useRef } from 'react';

type UseInfinityScrollProps = {
  getAfterData?: () => Promise<void> | void;
  getBeforeData?: () => Promise<void> | void;
  initialScrollPosition?: InitialScrollPosition;
  isLoading?: boolean;
  hasAfterMore?: boolean;
  hasBeforeMore?: boolean;
  scrollThreshold?: number;
};

const useInfinityScroll = ({
  getBeforeData,
  getAfterData,
  hasBeforeMore = false,
  hasAfterMore = false,
  scrollThreshold = 100,
  isLoading = false,
  initialScrollPosition = InitialScrollPosition.TOP,
}: UseInfinityScrollProps) => {
  const listRef = useRef<HTMLDivElement>(null);

  const isScrollHeight = (listRef.current?.scrollHeight || 0) > (listRef.current?.clientHeight || 0);

  useEffect(() => {
    if (isScrollHeight) {
      scrollToInitialPosition();
    }
  }, [isScrollHeight, listRef.current?.clientHeight, initialScrollPosition]);

  const scrollToInitialPosition = () => {
    if (listRef.current) {
      const scrollHeight = listRef.current?.scrollHeight || 0;

      const scrollTopMapping = {
        [InitialScrollPosition.TOP]: 0,
        [InitialScrollPosition.BOTTOM]: scrollHeight,
      };
      listRef.current.scrollTo({ top: scrollTopMapping[initialScrollPosition] });
    }
  };

  const onTopScroll = async () => {
    if (getBeforeData) {
      const scrollTop = listRef.current?.scrollTop || 0;

      const isMore = scrollTop <= scrollThreshold && !isLoading && hasBeforeMore;

      if (isMore) {
        await getBeforeData();
      }
    }
  };

  const onBottomScroll = async () => {
    if (getAfterData) {
      const scrollHeight = listRef.current?.scrollHeight || 0;
      const clientHeight = listRef.current?.clientHeight || 0;
      const scrollTop = listRef.current?.scrollTop || 0;
      const scrollBottom = scrollTop + clientHeight;

      const isMore = scrollBottom >= scrollHeight - scrollThreshold && !isLoading && hasAfterMore;

      if (isMore) {
        await getAfterData();
      }
    }
  };

  const handleScroll = () => {
    if (listRef.current) {
      onTopScroll();
      onBottomScroll();
    }
  };

  return { listRef, handleScroll, scrollToInitialPosition };
};

export default useInfinityScroll;

export enum InitialScrollPosition {
  TOP,
  BOTTOM,
}
