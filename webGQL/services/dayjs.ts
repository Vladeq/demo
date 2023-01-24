import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import ru from 'dayjs/locale/ru';
import parseDate from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

import { i18n } from '../../next-i18next.config';

dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(parseDate);
dayjs.extend(isBetween);
dayjs.extend(utc);

dayjs.locale(en);
dayjs.locale(ru);
dayjs.locale(i18n.lng);

export type DateUtilType = string | Date;

export class DateUtil {
  static parse(param: DateUtilType) {
    return dayjs(param);
  }

  static parseUTC(param: DateUtilType) {
    return dayjs(param).utc();
  }

  static add(date: DateUtilType, { value, unit }: { value: number; unit: dayjs.ManipulateType }) {
    return dayjs(date).add(value, unit);
  }

  static now() {
    return dayjs();
  }

  static getDiffBetweenTwoDates(startDate: DateUtilType, endDate: DateUtilType, unit: dayjs.OpUnitType, float = false) {
    return DateUtil.parse(endDate).diff(startDate, unit, float);
  }

  static getDiffBetweenTwoDatesUTC(
    startDate: DateUtilType,
    endDate: DateUtilType,
    unit: dayjs.OpUnitType,
    float = false,
  ) {
    return DateUtil.parse(endDate).utc().diff(startDate, unit, float);
  }

  static unix(param: number) {
    return dayjs.unix(param);
  }
}

export default dayjs;
