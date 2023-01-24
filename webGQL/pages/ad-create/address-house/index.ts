import dynamic from 'next/dynamic';

import { Routes } from '../../../constains';
import { checkActualStep } from '../../../hocs';

const addressHouse = dynamic(() => import('../../../pagesComponents/AddressHouse/AddressHouse'), { ssr: false });

export default checkActualStep(addressHouse, Routes.adCreateAddress);
