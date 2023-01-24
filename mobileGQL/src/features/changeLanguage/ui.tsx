import { i18n } from 'entities';
import React, { FC } from 'react';
import { Button } from 'react-native';
import { APP_LANGUAGES } from 'shared/constants';

const ChangeLanguage: FC = () => {
  return <Button title={'test'} onPress={() => i18n.changeLanguage(APP_LANGUAGES.EN)} />;
};

export default ChangeLanguage;
