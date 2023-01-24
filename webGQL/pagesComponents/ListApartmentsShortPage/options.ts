import { i18n } from 'services';

import { LocalTypes } from '../../../public/locales/types';
import {
  ApartmentRuleType,
  ApartmentType,
  ShortTermRentBookingType,
  ShortTermRentCancellationPolicyType,
} from '../../__generated__/types';
import { TabsValueType } from '../../types/tabs';

export enum RulesEnum {
  SMOKE = 'allowedToSmoke',
  CHILDREN = 'allowedWithChildren',
  PARTY = 'allowedToHangingOut',
  PETS = 'allowedWithPets',
  NoRules = 'noRules',
}

export const accommodationOptions = [
  {
    label: i18n.t('bottomFilters.noMatter', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    description: i18n.t('modalFilters.anyBookingType', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: '',
  },
  {
    label: i18n.t('modalFilters.requestBookingTypeLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    description: i18n.t('modalFilters.requestBookingTypeValue', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentBookingType.Request,
  },
  {
    label: i18n.t('modalFilters.instantBookingTypeLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    description: i18n.t('modalFilters.instantBookingTypeValue', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentBookingType.Instant,
  },
];

export const rulesArray = [
  { text: i18n.t('bottomFilters.noMatter', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), name: RulesEnum.NoRules },
  {
    text: i18n.t('modalFilters.allowedWithPets', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: ApartmentRuleType.AllowedWithPets,
  },
  {
    text: i18n.t('modalFilters.allowedWithChildren', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: ApartmentRuleType.AllowedWithChildren,
  },
  {
    text: i18n.t('modalFilters.allowedToSmoke', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: ApartmentRuleType.AllowedToSmoke,
  },
  {
    text: i18n.t('modalFilters.allowedToHangingOut', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: ApartmentRuleType.AllowedToHangingOut,
  },
];

export const roomsArray = [
  { title: i18n.t('bottomFilters.noMatter', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: 'no' },
  { title: i18n.t('bottomFilters.stydio', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: '0' },
  { title: '1', value: '1' },
  { title: '2', value: '2' },
  { title: '3', value: '3' },
  { title: '4', value: '4' },
  { title: '5', value: '5' },
  { title: '6', value: '6' },
  { title: '7', value: '7' },
  { title: '8+', value: '8' },
];

export const typeHouseArray = [
  { title: i18n.t('bottomFilters.all', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: 'no' },
  { title: i18n.t('bottomFilters.flats', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Flat },
  { title: i18n.t('bottomFilters.rooms', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Room },
  { title: i18n.t('bottomFilters.cottages', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Cottage },
  { title: i18n.t('bottomFilters.hostels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Hostel },
  {
    title: i18n.t('bottomFilters.miniHotels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.MiniHotel,
  },
  {
    title: i18n.t('bottomFilters.guestHouses', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.Guesthouse,
  },
  {
    title: i18n.t('bottomFilters.apartHotels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.Aparthotel,
  },
];

export const rulesOptions = [
  {
    label: i18n.t('bottomFilters.noMatter', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: '',
    text: '',
  },
  {
    label: i18n.t('modalFilters.flexibleLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentCancellationPolicyType.Flexible,
    text: i18n.t('modalFilters.flexibleText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  {
    label: i18n.t('modalFilters.moderateLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentCancellationPolicyType.Moderate,
    text: i18n.t('modalFilters.moderateText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  {
    label: i18n.t('modalFilters.inflexibleLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentCancellationPolicyType.Inflexible,
    text: i18n.t('modalFilters.inflexibleText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
  {
    label: i18n.t('modalFilters.strictLabel', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ShortTermRentCancellationPolicyType.Strict,
    text: i18n.t('modalFilters.strictText', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
  },
];

export const tabs = [
  { title: i18n.t('filters.shortTerm', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: TabsValueType.SHORT, id: '0' },
  { title: i18n.t('filters.longTerm', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: TabsValueType.LONG, id: '1' },
];
