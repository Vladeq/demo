import { regExp } from '../constains/regExp';

export const handleDivisionOnCategories = (price: string) => {
  return price.replace(regExp.onlyNumber, '').replace(regExp.divisions, ' ');
};
