import { Routes } from 'constains';
import { checkActualStep } from 'hocs';
import dynamic from 'next/dynamic';

const houseMedias = dynamic(() => import('../../../pagesComponents/HouseMedias/HouseMedias'), { ssr: false });

export default checkActualStep(houseMedias, Routes.adCreateHouseMedia);
