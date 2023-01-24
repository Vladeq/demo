import { ChangePhone } from 'features';
import { EditPhoneScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultLayout } from 'widgets';

import styles from './edit-phone-screen.styles';

const EditPhoneScreen: FC<EditPhoneScreenProps> = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <DefaultLayout.Header title={t('screens.EditPhone.title')} defaultBack />
      <ChangePhone.ChangePhoneForm style={styles.form} />
    </DefaultLayout>
  );
};

export default EditPhoneScreen;
