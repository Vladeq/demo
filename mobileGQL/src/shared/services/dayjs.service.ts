import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import parseDate from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.extend(localeData);
dayjs.extend(parseDate);
dayjs.extend(isSameOrBefore);

dayjs.locale(en);

export default dayjs;
