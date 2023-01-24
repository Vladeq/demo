import { ApartmentAdRulesModel } from '__generated__/types';
import { ApartmentAdRules } from 'constains';

export const returnHomeRules = (rules: ApartmentAdRulesModel) => {
  const homeRules = [
    {
      ...(rules.allowedWithPets ? ApartmentAdRules.allowedWithPets : ApartmentAdRules.doNotAllowedWithPets),
    },
    {
      ...(rules.allowedToSmoke ? ApartmentAdRules.allowedToSmoke : ApartmentAdRules.doNotAllowedToSmoke),
    },
    {
      ...(rules.allowedToHangingOut ? ApartmentAdRules.allowedToHangingOut : ApartmentAdRules.doNotAllowedToHangingOut),
    },
    {
      ...(rules.allowedWithChildren ? ApartmentAdRules.allowedWithChildren : ApartmentAdRules.doNotAllowedWithChildren),
    },
  ];

  return homeRules;
};
