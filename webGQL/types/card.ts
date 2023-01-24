import { ApartmentAdStatusType, RentPeriodType, ShortTermRentBookingType } from '__generated__/types';

export interface BaseCardProps {
  pictureSrc: string;
  title: string;
  address?: string;
  price: string;
}

export enum RequestStatusEnum {
  INIT = 'INIT',
  SENDED = 'SENDED',
  APPROVED = 'APPROVED',
  PAUSED = 'PAUSED',
}

export enum CardStatusEnum {
  ACTIVE = 'ACTIVE',
  PUBLISHED = 'PUBLISHED',
  PROCESSING = 'PROCESSING',
  PAUSED = 'PAUSED',
  DRAFT = 'DRAFT',
}

export enum RentTypeEnum {
  SHORT = 'SHORT',
  LONG = 'LONG',
}

export interface BaseModalProps {
  close: () => void;
}

export interface BaseMyAdsCardComponentProps {
  status: ApartmentAdStatusType;
  rentType?: RentPeriodType;
  confirmData: boolean;
  rentBookingType?: ShortTermRentBookingType | undefined;
  confirmPhone: boolean;
  confirmDocuments: boolean;
  confirmed?: boolean;
  payMethod: boolean;
  id?: string;
  currentStep?: number;
  declineReason?: string;
}
