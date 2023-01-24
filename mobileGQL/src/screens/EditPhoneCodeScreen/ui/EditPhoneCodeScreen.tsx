import { ChangePhone } from 'features';
import { EditPhoneCodeScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { CODE_LENGTH } from '../config';
import styles from './edit-phone-code-screen.styles';

const EditPhoneCodeScreen: FC<EditPhoneCodeScreenProps> = ({ route }) => {
  const { t } = useTranslation();

  return (
    <DefaultLayout>
      <DefaultLayout.Header defaultBack />

      <AppText style={styles.title}>{t('screens.EditPhoneCode.title')}</AppText>
      <AppText style={styles.description}>
        {t('screens.EditPhoneCode.description', { codeLength: CODE_LENGTH })}
      </AppText>

      <ChangePhone.VerifyCodeForm
        cellCount={CODE_LENGTH}
        phone={route.params.phone}
        cognitoUser={route.params.cognitoUser}
      />
    </DefaultLayout>
  );
};

export default EditPhoneCodeScreen;
