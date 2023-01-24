import { CreateApartmentAdRequest, RentPeriodType } from '../../__generated__/types';

interface FormValues {
  rent: RentPeriodType;
  countForShortRent: string;
  countForLongRent: string;
}
const map: Record<RentPeriodType, (data: FormValues) => CreateApartmentAdRequest> = {
  [RentPeriodType.All]: (data: FormValues) => {
    return {
      longTermRentCost: data.countForLongRent.replaceAll(' ', ''),
      shortTermRentCost: data.countForShortRent.replaceAll(' ', ''),
      rentPeriodType: data.rent,
    };
  },
  [RentPeriodType.ShortTerm]: (data: FormValues) => {
    return {
      shortTermRentCost: data.countForShortRent.replaceAll(' ', ''),
      rentPeriodType: data.rent,
    };
  },
  [RentPeriodType.LongTerm]: (data: FormValues) => {
    return {
      longTermRentCost: data.countForLongRent.replaceAll(' ', ''),
      rentPeriodType: data.rent,
    };
  },
};

export function getInput(data: FormValues): CreateApartmentAdRequest {
  return map[data.rent](data);
}
