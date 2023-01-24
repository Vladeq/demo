import { Routes } from 'constains';
import { checkActualStep } from 'hocs';
import dynamic from 'next/dynamic';

const typeHousing = dynamic(() => import('../../../pagesComponents/ChooseHouseType/TypeHousing'), { ssr: false });

export default checkActualStep(typeHousing, Routes.adCreateHouseType);
