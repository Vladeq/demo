import { i18n } from 'services';

import { LocalTypes } from '../../public/locales/types';

export const MB_IN_BYTES = 1000000;
export const KB_IN_BYTES = 1000;

export const getPercentOnRent = (count: number, percent: number) => {
  return (count / 100) * percent;
};

export const getFileWeight = (fileWeightInBytes: number) => {
  const fileWeightInMB = fileWeightInBytes / MB_IN_BYTES;
  const fileWeightInKB = fileWeightInBytes / KB_IN_BYTES;

  if (fileWeightInMB < 1) {
    const formattedFileWeightInKB = fileWeightInKB.toFixed(2);
    return `${formattedFileWeightInKB} ${i18n.t('fileWeight.weightInKB', { ns: LocalTypes.COMMON })}`;
  }

  const formattedFileWeightInMB = Math.round(fileWeightInMB);
  return `${formattedFileWeightInMB} ${i18n.t('fileWeight.weightInMB', { ns: LocalTypes.COMMON })}`;
};
