import debounce from 'lodash/debounce';
import { useRef } from 'react';

const useDebouncedSearch = (callback: (min: string, max: string) => void, delay: number) => {
  return useRef(debounce((min, max) => callback(min, max), delay));
};

export default useDebouncedSearch;
