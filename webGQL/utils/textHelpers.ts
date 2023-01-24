export const removeSlashAfter = (target: string) =>
  target[target.length - 1].includes('/') ? target.slice(0, -1) : target;

export const addSlashBefore = (target: string | string[]) =>
  // eslint-disable-next-line no-nested-ternary
  target[0] ? (target[0].includes('/') ? target : `/${target}`) : '';

const HTTPS = 'https://';
const HTTP = 'http://';

export const slashAgnostic = (...linkParts: string[]) =>
  linkParts.reduce((link, part, index) => {
    if (index === 0 && part.slice(0, HTTPS.length) !== HTTPS && part.slice(0, HTTP.length) !== HTTP) {
      return HTTPS + part;
    }
    if (index === 0) {
      return part;
    }

    return `${removeSlashAfter(link)}${addSlashBefore(part)}`;
  }, '');

/**
 * @example
 * handleWordsDeclination(
 *   count: 3,
 *   declination: [гость, гостя, гостей]
 *   для русской локализации последовательность в соответствии с падежами [И.П(ед.ч) Р.П(ед.ч) Р.П(мн.ч)]
 *   для английской локализации соответственно [ед.ч, мн.ч, мн.ч] например [guest, guests, guests]
 * ) // гостя
 */

export const handleWordsDeclination = (count: number, declinations: Array<string>) => {
  const variants = [2, 0, 1, 1, 1, 2];
  return declinations[count % 100 > 4 && count % 100 < 20 ? 2 : variants[count % 10 < 5 ? count % 10 : 5]];
};

export const pluralHandler = (quantity: Array<number>, pluralValues: Array<string>, singleValues: Array<string>) => {
  const resultArray = [];
  for (let i = 0; i < quantity?.length; i++) {
    if (quantity[i] === 1) {
      resultArray.push(quantity[i] + singleValues[i]);
    } else if (quantity[i] > 1) {
      resultArray.push(quantity[i] + pluralValues[i]);
    }
  }
  return resultArray.join(', ');
};

export const stringCircumcision = (str: string, count: number) => {
  return str?.length > count ? `${str.substring(0, count)}...` : str;
};

export const numberCircumcision = (number: number, maxNumber = 99) => {
  return number > maxNumber ? `${maxNumber}+` : `${number}`;
};

export const locationToString = ({
  street,
  city,
  houseNumber,
}: {
  street?: string;
  city?: string;
  houseNumber?: string;
}) => `${city ? `${city}, ` : ''}${street ? `${street}, ` : ''}${houseNumber || ''}`;

export const capitalizeFirstLetter = (string: string) => (string = string.charAt(0).toUpperCase() + string.slice(1));

export const removeQueryFromUrl = (url: string) => url.split('?')[0];
