import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import nextI18nextConfig from '../../next-i18next.config';
import apartmentPageRu from '../../public/locales/ru/apartmentPage.json';
import commonRu from '../../public/locales/ru/common.json';
import listApartmentsPage from '../../public/locales/ru/listApartmentsPage.json';
import paymentPageRu from '../../public/locales/ru/paymentPage.json';
import profilePageRu from '../../public/locales/ru/profilePage.json';
import uiRu from '../../public/locales/ru/ui.json';

export const resources = {
  ru: {
    common: commonRu,
    ui: uiRu,
    profilePage: profilePageRu,
    apartmentPage: apartmentPageRu,
    paymentPage: paymentPageRu,
    listApartmentsPage,
  },
} as const;

i18n.use(initReactI18next).init({
  ...nextI18nextConfig.i18n,
  resources,
});

export default i18n;
