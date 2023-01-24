import { useState } from 'react';

const usePagination = (limit = 10, startPage = 0) => {
  const [page, setPage] = useState(startPage);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  return { page, handleSetPage, limit };
};

export default usePagination;
