import dynamic from 'next/dynamic';

const ActiveRent = dynamic(() => import('../../pagesComponents/ActiveRent/ActiveRent'), {
  ssr: false,
});

export default ActiveRent;
