import dynamic from 'next/dynamic';

const CardLinkingPage = dynamic(() => import('../../pagesComponents/CaardLinkingPage/CardLinkingPage'), {
  ssr: false,
});

export default CardLinkingPage;
