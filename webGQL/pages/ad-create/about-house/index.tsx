import dynamic from 'next/dynamic';

import { Routes } from '../../../constains';
import { checkActualStep } from '../../../hocs';

const aboutHouse = dynamic(() => import('../../../pagesComponents/AboutHouse/AboutHouse'), { ssr: false });

export default checkActualStep(aboutHouse, Routes.adCreateAboutHouse);
