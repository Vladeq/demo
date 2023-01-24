import dynamic from 'next/dynamic';

const PaymentPage = dynamic(() => import('../../pagesComponents/PaymentPage/PaymentPage'), {
  ssr: false,
});

export default PaymentPage;
