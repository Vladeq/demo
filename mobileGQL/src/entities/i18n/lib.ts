import i18n from 'i18next';
import { Normalize, initReactI18next } from 'react-i18next';
import { APP_LANGUAGES } from 'shared/constants';
import { en } from 'shared/lang/en.json';

export const resources = {
  en,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: APP_LANGUAGES.EN,
  resources,
  // returnObjects: true,
  missingInterpolationHandler: function () {},
  interpolation: {
    escapeValue: false,
  },
});

export const changeLanguage = (lang: APP_LANGUAGES) => {
  i18n.changeLanguage(lang);
};

export default i18n;

const translation = en.translation;
export type TranslationObject = typeof translation;
export type KeysTranslation = Normalize<typeof translation>;
