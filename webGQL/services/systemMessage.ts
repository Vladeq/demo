import { ApartmentRentPeriodType, MessageModel, SystemMessageType } from '__generated__/types';
import { systemMessageMapping } from 'constains';

import { LocalTypes } from '../../public/locales/types';
import dayjs from './dayjs';
import i18n from './i18n';

type SystemMessageConstructor = { message: MessageModel; myId?: string; isLandlord?: boolean };

class SystemMessage {
  message?: MessageModel;

  isMyMessage = false;

  isLandlord = false;

  isLongTerm = false;

  constructor({ message, myId, isLandlord = false }: SystemMessageConstructor) {
    this.message = message;
    this.isMyMessage = myId === this.message?.sender?.id;
    this.isLandlord = isLandlord;
    this.isLongTerm = message.contractData?.apartmentRentPeriodType === ApartmentRentPeriodType.LongTerm;
  }

  getSystemMessage(): string {
    switch (this.message?.systemMessageType) {
      case SystemMessageType.BookingCreated: {
        return this.getBookingCreatedMessage();
      }
      case SystemMessageType.BookingConcluded: {
        return this.getBookingConcludedMessage();
      }
      case SystemMessageType.OfferSending: {
        return this.getOfferSendingMessage();
      }
      case SystemMessageType.OfferRejected: {
        return this.getOfferRejectedMessage();
      }
      case SystemMessageType.OfferRejectedBySystem: {
        return this.getOfferRejectedBySystemMessage();
      }
      case SystemMessageType.InstantBooking: {
        return this.getInstantBookingMessage();
      }
      default: {
        return '';
      }
    }
  }

  getBookingCreatedMessage() {
    const departureDateInString = this.message?.contractData?.departureDate;
    const arrivalDateInString = this.message?.contractData?.arrivalDate;
    const systemMessageType = this.message?.systemMessageType;

    const isDate = !!departureDateInString && !!arrivalDateInString;
    const isSameYear = dayjs(departureDateInString).year === dayjs(arrivalDateInString).year;

    const arrivalDateFormat = isSameYear ? 'DD MMMM' : 'DD MMMM YYYY';

    const arrivalDate = isDate ? dayjs(arrivalDateInString).format(arrivalDateFormat) : '';
    const departureDate = isDate ? dayjs(departureDateInString).format('DD MMMM YYYY') : '';

    const bookingDate = isDate
      ? i18n.t('systemMessages.bookingRequestDate', {
          count: { arrivalDate, departureDate } as any,
          ns: LocalTypes.COMMON,
        })
      : '';

    const systemMessage = systemMessageType ? systemMessageMapping[systemMessageType] + bookingDate : '';

    return systemMessage;
  }

  getBookingConcludedMessage() {
    const systemMessageTitle = i18n.t('systemMessages.bookingConcluded.title');

    const landlordMessageDescription = this.isLongTerm
      ? i18n.t('systemMessages.bookingConcluded.longTermDescription.landlord')
      : i18n.t('systemMessages.bookingConcluded.shortTermDescription.landlord');

    const tenantMessageDescription = this.isLongTerm
      ? i18n.t('systemMessages.bookingConcluded.longTermDescription.tenant')
      : i18n.t('systemMessages.bookingConcluded.shortTermDescription.tenant');

    const systemMessageDescription = this.isLandlord ? landlordMessageDescription : tenantMessageDescription;

    const systemMessage = this.createSystemMessageWithDescription(systemMessageTitle, systemMessageDescription);

    return systemMessage;
  }

  getOfferSendingMessage() {
    const systemMessage = this.isMyMessage
      ? i18n.t('systemMessages.offerSending.landlord')
      : i18n.t('systemMessages.offerSending.tenant');
    return systemMessage;
  }

  getOfferRejectedMessage() {
    const landlordMessage = this.isMyMessage
      ? i18n.t('systemMessages.offerRejected.landlord.sent')
      : i18n.t('systemMessages.offerRejected.landlord.received');
    const tenantMessage = this.isMyMessage
      ? i18n.t('systemMessages.offerRejected.tenant.sent')
      : i18n.t('systemMessages.offerRejected.tenant.received');

    const systemMessage = this.isLandlord ? landlordMessage : tenantMessage;

    return systemMessage;
  }

  getOfferRejectedBySystemMessage() {
    const systemMessageDescription = this.isLandlord
      ? i18n.t('systemMessages.offerRejected.system.description.landlord')
      : i18n.t('systemMessages.offerRejected.system.description.tenant');

    const systemMessage = this.createSystemMessageWithDescription(
      i18n.t('systemMessages.offerRejected.system.title'),
      systemMessageDescription,
    );

    return systemMessage;
  }

  getInstantBookingMessage() {
    const systemMessageTitle = i18n.t('systemMessages.instantBooking.title');
    const systemMessageDescription = this.isLandlord
      ? i18n.t('systemMessages.instantBooking.description.landlord')
      : i18n.t('systemMessages.instantBooking.description.tenant');

    const systemMessage = this.createSystemMessageWithDescription(systemMessageTitle, systemMessageDescription);

    return systemMessage;
  }

  createSystemMessageWithDescription(title: string, description: string) {
    return `${title}/${description}`;
  }
}

export default SystemMessage;
