import { LocalTypes } from '../../../public/locales/types';
import { ApartmentType } from '../../__generated__/types';
import { i18n } from '../../services';

export enum RulesEnum {
  SMOKE = 'allowedToSmoke',
  CHILDREN = 'allowedWithChildren',
  PARTY = 'allowedToHangingOut',
  PETS = 'allowedWithPets',
  NoRules = 'noRules',
}

export const houseTypeOptions = [
  { label: i18n.t('bottomFilters.all', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: '' },
  { label: i18n.t('bottomFilters.flats', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Flat },
  { label: i18n.t('bottomFilters.rooms', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Room },
  { label: i18n.t('bottomFilters.cottages', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Cottage },
  { label: i18n.t('bottomFilters.hostels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }), value: ApartmentType.Hostel },
  {
    label: i18n.t('bottomFilters.miniHotels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.MiniHotel,
  },
  {
    label: i18n.t('bottomFilters.guestHouses', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.Guesthouse,
  },
  {
    label: i18n.t('bottomFilters.apartHotels', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    value: ApartmentType.Aparthotel,
  },
];

export const optionsMyltiple = [
  {
    title: '',
    placeholder: i18n.t('bottomFilters.arrival', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: 'dateStart',
  },
  {
    title: '',
    placeholder: i18n.t('bottomFilters.departure', { ns: LocalTypes.LIST_APARTMENTS_PAGE }),
    name: 'dateEnd',
  },
];
