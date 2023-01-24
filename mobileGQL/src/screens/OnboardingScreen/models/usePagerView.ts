import { useRef, useState } from 'react';
import PagerView from 'react-native-pager-view';

const usePagerView = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isChangingPage, setIsChangingPage] = useState(false); // true, if transition animation before page is running
  const pagerViewRef = useRef<PagerView>(null);

  const handleNextPage = () => {
    if (!isChangingPage) {
      setIsChangingPage(true);
      pagerViewRef.current?.setPage(currentStep + 1);
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (!isChangingPage) {
      setIsChangingPage(true);
      pagerViewRef.current?.setPage(currentStep - 1);
      setCurrentStep((prev) => prev - 1);
    }
  };
  const onPageSelected = () => {
    setIsChangingPage(false);
  };

  return { currentStep, handleNextPage, handlePrevPage, pagerViewRef, onPageSelected, isChangingPage };
};

export default usePagerView;
