import { AddressType } from '../types/advert';

export const validateAddress = (selectedAddress: AddressType) => {
  const { location, city, houseNumber, street, country } = selectedAddress;
  return !!(location.lat && location.lng && city && houseNumber && street && country);
};
