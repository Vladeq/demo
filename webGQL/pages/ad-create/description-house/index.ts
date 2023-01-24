import { Routes } from 'constains';
import { checkActualStep } from 'hocs';
import dynamic from 'next/dynamic';

const descriptionHouse = dynamic(() => import('../../../pagesComponents/DescriptionHouse/DescriptionHouse'), {
  ssr: false,
});

export default checkActualStep(descriptionHouse, Routes.adDescriptionHouse);
