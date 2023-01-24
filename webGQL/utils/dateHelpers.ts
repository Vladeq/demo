import { dayjs, i18n } from 'services';

import { LocalTypes } from '../../public/locales/types';
import { DateUtil } from '../services/dayjs';

type ILockedDate = Omit<LockedDateById, 'id'>;

type LockedDateById = {
  id: string;
  startDate: string;
  endDate: string;
};
export interface IArrivalDepartureDates {
  arrivalDate: string;
  departureDate: string;
}

const DAY_LIVE_IN_HOURS = 22;

export const formatDate = (date: string, isTime = false) => {
  const time = isTime ? ` ${i18n.t('date.atTime', { ns: LocalTypes.COMMON })} ${dayjs(date).format('HH:mm')}` : '';

  if (dayjs(date).format('DD:MM:YY').toString() === dayjs().format('DD:MM:YY').toString()) {
    return i18n.t('notify.today') + time;
  }
  if (dayjs(date).format('DD:MM:YY') === dayjs().subtract(1, 'd').format('DD:MM:YY')) {
    return i18n.t('notify.yesterday') + time;
  }
  return dayjs(date).format('DD.MM.YY') + time;
};

export const formatDateToRange = (fullDateString: string) =>
  fullDateString
    .split(' - ')
    .filter((date) => !!date.trim())
    .map((date) => (date ? dayjs((date || '') as string).format('DD MMMM YYYY') : ''))
    .join(' - ');

export const formatDateToRangeWithoutYear = (fullDateString: string) =>
  fullDateString
    .split(' - ')
    .filter((date) => !!date.trim())
    .map((date) => (date ? dayjs((date || '') as string).format('DD MMMM') : ''))
    .join(' - ');

export const reverseDate = (date: string) => date.split('-').reverse().join('.');

export const formatDateToFutureRange = (days: number, format: string) => dayjs().add(days, 'day').format(format);

export const minDateForRequest = dayjs(new Date().toISOString()).subtract(1, 'day');

export const areIntersected = (lockedDates: ILockedDate[]) => {
  const intersectionsResult = lockedDates.map((lockedDate, indexMap) => {
    return lockedDates.reduce((acc, curr, indexReduce) => {
      if (indexMap === indexReduce) {
        return acc;
      }

      return isDatesOverlaps(curr, lockedDate);
    }, false);
  });

  return intersectionsResult.some((i) => i);
};

const isDatesOverlaps = (date1: ILockedDate, date2: ILockedDate) => {
  return (
    dayjs(date1.startDate).isBetween(dayjs(date2.startDate), dayjs(date2.endDate)) ||
    dayjs(date1.endDate).isBetween(dayjs(date2.startDate), dayjs(date2.endDate)) ||
    dayjs(date2.startDate).isBetween(dayjs(date1.startDate), dayjs(date1.endDate)) ||
    date1.startDate === date2.startDate ||
    date1.endDate === date2.startDate ||
    date2.endDate === date1.endDate
  );
};

export const formatTime = (defaultArrivalDate: string, defaultDepartureTime: string) => {
  const [arrivalHourString, arrivalMinString] = defaultArrivalDate.split(':');
  const [departureHourString, departureMinString] = defaultDepartureTime.split(':');

  const arrivalDate = DateUtil.now()
    .utc()
    .startOf('day')
    .set('hour', Number(arrivalHourString))
    .set('minute', Number(arrivalMinString))
    .toISOString();

  const departureDate = DateUtil.now()
    .utc()
    .startOf('day')
    .set('hour', Number(departureHourString))
    .set('minute', Number(departureMinString))
    .toISOString();

  return validateTimeOrThrowError({ arrivalDate, departureDate });
};

export const validateTimeOrThrowError = ({ arrivalDate, departureDate }: IArrivalDepartureDates) => {
  const errorMessage = 'Разница между прибытием и выездом должна быть равна 22 ч';

  const parsedArrivalDate = DateUtil.parseUTC(arrivalDate);
  const parsedDepartureDate = DateUtil.parseUTC(departureDate);

  const isDepartureTimeLessThanArrivalTime = parsedArrivalDate.hour() >= parsedDepartureDate.hour();

  if (isDepartureTimeLessThanArrivalTime) {
    const differenceInHours = DateUtil.getDiffBetweenTwoDatesUTC(
      arrivalDate,
      parsedArrivalDate
        .hour(parsedDepartureDate.hour())
        .minute(parsedDepartureDate.minute())
        .millisecond(parsedDepartureDate.millisecond())
        .add(1, 'day')
        .toISOString(),

      'hours',
    );

    const isValid = differenceInHours === DAY_LIVE_IN_HOURS;

    if (isValid) {
      return;
    }

    return errorMessage;
  }

  const differenceInHours = DateUtil.getDiffBetweenTwoDatesUTC(
    arrivalDate,
    parsedArrivalDate
      .hour(parsedDepartureDate.hour())
      .minute(parsedDepartureDate.minute())
      .millisecond(parsedDepartureDate.millisecond())
      .toISOString(),
    'hours',
  );

  const isValid = differenceInHours === DAY_LIVE_IN_HOURS;

  if (isValid) {
    return;
  }

  return errorMessage;
};
