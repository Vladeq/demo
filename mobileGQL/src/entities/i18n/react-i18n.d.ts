import 'react-i18next';

import { en } from 'shared/lang/en.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en';

    resources: {
      en: typeof en.translation;
    };
  }
}
