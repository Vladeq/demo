import { ApartmentRentPeriodType, ShortTermRentCancellationPolicyType, SystemMessageType } from '__generated__/types';
import { i18n } from 'services';
import { OptionType } from 'types';

import { LocalTypes } from '../../public/locales/types';
import { Children, NoChildren, NoParty, NoPets, NoSmoking, Party, Pets, Smoking } from '../../public/svg/components';

export * from './routes';
export * from './pluralForms';
export * from './input';
export * from './config';

export const isClientSide = typeof window !== 'undefined';

export const locales = [LocalTypes.UI, LocalTypes.COMMON, LocalTypes.AUTH_PAGE];

export const monthsList: OptionType[] = [
  { label: i18n.t('months.january', { ns: LocalTypes.COMMON }), value: '0' },
  { label: i18n.t('months.february', { ns: LocalTypes.COMMON }), value: '1' },
  { label: i18n.t('months.march', { ns: LocalTypes.COMMON }), value: '2' },
  { label: i18n.t('months.april', { ns: LocalTypes.COMMON }), value: '3' },
  { label: i18n.t('months.may', { ns: LocalTypes.COMMON }), value: '4' },
  { label: i18n.t('months.june', { ns: LocalTypes.COMMON }), value: '5' },
  { label: i18n.t('months.july', { ns: LocalTypes.COMMON }), value: '6' },
  { label: i18n.t('months.august', { ns: LocalTypes.COMMON }), value: '7' },
  { label: i18n.t('months.september', { ns: LocalTypes.COMMON }), value: '8' },
  { label: i18n.t('months.october', { ns: LocalTypes.COMMON }), value: '9' },
  { label: i18n.t('months.november', { ns: LocalTypes.COMMON }), value: '10' },
  { label: i18n.t('months.december', { ns: LocalTypes.COMMON }), value: '11' },
];

export const monthOptions = [
  { label: `1 ${i18n.t('monthForm.singularPrimary', { ns: LocalTypes.COMMON })}`, value: '1' },
  { label: `2 ${i18n.t('monthForm.singularSecondary', { ns: LocalTypes.COMMON })}`, value: '2' },
  { label: `3 ${i18n.t('monthForm.singularSecondary', { ns: LocalTypes.COMMON })}`, value: '3' },
  { label: `4 ${i18n.t('monthForm.singularSecondary', { ns: LocalTypes.COMMON })}`, value: '4' },
  { label: `5 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '5' },
  { label: `6 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '6' },
  { label: `7 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '7' },
  { label: `8 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '8' },
  { label: `9 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '9' },
  { label: `10 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '10' },
  { label: `11 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '11' },
  { label: `12 ${i18n.t('monthForm.plural', { ns: LocalTypes.COMMON })}`, value: '12' },
];
export const citiesList = [
  { label: i18n.t('cities.almaty', { ns: LocalTypes.COMMON }), lat: '43.2567', lng: '76.9286' },
  { label: i18n.t('cities.nurSultan', { ns: LocalTypes.COMMON }), lat: '51.1801', lng: '71.446' },
  { label: i18n.t('cities.shymkent', { ns: LocalTypes.COMMON }), lat: '42.3', lng: '69.6' },
  { label: i18n.t('cities.aktobe', { ns: LocalTypes.COMMON }), lat: '50.28', lng: '57.21' },
  { label: i18n.t('cities.karaganda', { ns: LocalTypes.COMMON }), lat: '49.8019', lng: '73.1021' },
  { label: i18n.t('cities.atyrau', { ns: LocalTypes.COMMON }), lat: '47.12', lng: '51.88' },
];

export const rentPeriodMapping = {
  [ApartmentRentPeriodType.LongTerm]: i18n.t('rentPeriod.longTerm', { ns: LocalTypes.COMMON }),
  [ApartmentRentPeriodType.ShortTerm]: i18n.t('rentPeriod.shortTerm', { ns: LocalTypes.COMMON }),
};

export const ApartmentAdRules = {
  allowedToHangingOut: { label: i18n.t('homeRules.party', { ns: LocalTypes.COMMON }), icon: Party },
  doNotAllowedToHangingOut: { label: i18n.t('homeRules.noParty', { ns: LocalTypes.COMMON }), icon: NoParty },
  allowedToSmoke: { label: i18n.t('homeRules.smoking', { ns: LocalTypes.COMMON }), icon: Smoking },
  doNotAllowedToSmoke: { label: i18n.t('homeRules.noSmoking', { ns: LocalTypes.COMMON }), icon: NoSmoking },
  allowedWithChildren: { label: i18n.t('homeRules.children', { ns: LocalTypes.COMMON }), icon: Children },
  doNotAllowedWithChildren: { label: i18n.t('homeRules.noChildren', { ns: LocalTypes.COMMON }), icon: NoChildren },
  allowedWithPets: { label: i18n.t('homeRules.animals', { ns: LocalTypes.COMMON }), icon: Pets },
  doNotAllowedWithPets: { label: i18n.t('homeRules.noAnimals', { ns: LocalTypes.COMMON }), icon: NoPets },
};

export enum systemMessageEnum {
  OFFER_COMPLETED_SUCCESSFULLY,

  OFFER_REJECT_BY_TENANT_TO_LANDLORD,
  OFFER_REJECT_BY_LANDLORD_TO_TENANT,
  OFFER_REJECT_BY_LANDLORD_TO_LANDLORD,
  OFFER_REJECT_BY_TENANT_TO_TENANT,
  OFFER_REJECT_BY_SYSTEM,

  OFFER_TERMINATED_TO_LANDLORD,
  OFFER_TERMINATED_TO_TENANT,

  BOOKING_CONFIRMED_TO_TENANT,
  BOOKING_CONFIRMED_TO_LANDLORD,
}

export const systemMessageMapping = {
  [SystemMessageType.BookingCreated]: i18n.t('systemMessages.bookingRequest', { ns: LocalTypes.COMMON }),
  [SystemMessageType.BookingConcluded]: '',
  [SystemMessageType.OfferRejected]: '',
  [SystemMessageType.OfferRejectedBySystem]: '',
  [SystemMessageType.OfferSending]: '',
  [SystemMessageType.InstantBooking]: '',
};

export const APARTMENT_MIN_PRICE_FOR_BOOKING_SHORT = '5000';
export const APARTMENT_MIN_PRICE_FOR_BOOKING_LONG = '50000';
export const APARTMENT_MAX_PRICE_FOR_BOOKING = '9999999';

export const rentCancellationPolicyMapping = {
  [ShortTermRentCancellationPolicyType.Flexible]: {
    label: i18n.t('modalFilters.flexibleLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    text: i18n.t('modalFilters.flexibleText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  [ShortTermRentCancellationPolicyType.Moderate]: {
    label: i18n.t('modalFilters.moderateLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    text: i18n.t('modalFilters.moderateText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  [ShortTermRentCancellationPolicyType.Inflexible]: {
    label: i18n.t('modalFilters.inflexibleLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    text: i18n.t('modalFilters.inflexibleText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  [ShortTermRentCancellationPolicyType.Strict]: {
    label: i18n.t('modalFilters.strictLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    text: i18n.t('modalFilters.strictText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
};

export const timeOptions = [
  { label: '08:00', value: '08:00' },
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '11:00', value: '11:00' },
  { label: '12:00', value: '12:00' },
  { label: '13:00', value: '13:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' },
  { label: '20:00', value: '20:00' },
  { label: '21:00', value: '21:00' },
  { label: '22:00', value: '22:00' },
  { label: '23:00', value: '23:00' },
  { label: '00:00', value: '00:00' },
  { label: '01:00', value: '01:00' },
  { label: '02:00', value: '02:00' },
  { label: '03:00', value: '03:00' },
  { label: '04:00', value: '04:00' },
  { label: '05:00', value: '05:00' },
  { label: '06:00', value: '06:00' },
  { label: '07:00', value: '07:00' },
];

export const FEE_PERCENTS_SHORT_TERM = 12;
export const FEE_PERCENTS_LONG_TERM = 7;

export const TWENTY_MB = 20971520;
