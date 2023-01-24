import dynamic from 'next/dynamic';

import { Routes } from '../../constains';
import { checkActualStep } from '../../hocs';

const advert = dynamic(() => import('../../pagesComponents/ChooseRentType/ChooseRentType'), { ssr: false });

export default checkActualStep(advert, Routes.adCreate);
