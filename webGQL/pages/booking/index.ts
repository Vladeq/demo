import { checkAuth } from 'hocs';
import dynamic from 'next/dynamic';

const BookingPage = dynamic(() => import('../../pagesComponents/BookingPage/BookingPage'), {
  ssr: false,
});

export default checkAuth(BookingPage);
