import { ApartmentAdViewModel } from '../__generated__/types';
import { Routes } from '../constains';

export type Coords = {
  lat: number;
  lng: number;
};
export interface ApartmentAdInList extends Partial<Omit<ApartmentAdViewModel, 'address'>> {
  rentType?: string;
  guestsNum?: string;
  id: string;
  pictureSrc: string;
  address: string;
  title: string;
  price: string;
  isFocus?: boolean;
}
export type AddressType = {
  street: string;
  region?: string;
  location: Coords;
  country: string;
  houseNumber: string;
  city: string;
};

export const Steps = {
  [Routes.adCreate]: '1',
  [Routes.adCreateHouseType]: '2',
  [Routes.adCreateAboutHouse]: '3',
  [Routes.adCreateAddress]: '4',
  [Routes.adCreateHouseMedia]: '5',
  [Routes.adDescriptionHouse]: '6',
  [Routes.adInformationHouse]: '7',
};

export const StepsByIndex = [
  Routes.adCreate,
  Routes.adCreateHouseType,
  Routes.adCreateAboutHouse,
  Routes.adCreateAddress,
  Routes.adCreateHouseMedia,
  Routes.adDescriptionHouse,
  Routes.adInformationHouse,
];

export type StepProps = {
  step: string;
};
