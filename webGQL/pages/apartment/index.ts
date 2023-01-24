import dynamic from 'next/dynamic';

const ApartmentPage = dynamic(() => import('../../pagesComponents/ApartmentPage/ApartmentPage'), {
  ssr: false,
});

export default ApartmentPage;
