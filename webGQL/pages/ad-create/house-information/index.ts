import dynamic from 'next/dynamic';

import { Routes } from '../../../constains';
import { checkActualStep } from '../../../hocs';

const informationHouse = dynamic(() => import('../../../pagesComponents/InformationHouse/InformationHouse'), {
  ssr: false,
});

export default checkActualStep(informationHouse, Routes.adInformationHouse);
