import { Auth } from 'features';
import { CodeScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { CODE_LENGTH } from '../config';
import styles from './code-screen.styles';

const CodeScreen: FC<CodeScreenProps> = ({ route }) => {
  const { t } = useTranslation();
  Auth.useNavigateAfterAuth();

  return (
    <DefaultLayout>
      <DefaultLayout.Header defaultBack />

      <AppText style={styles.title}>{t('screens.VerificationCode.title')}</AppText>
      <AppText style={styles.description}>
        {t('screens.VerificationCode.description', { codeLength: CODE_LENGTH })}
      </AppText>

      <Auth.byPhone.VerifyCodeForm
        cellCount={CODE_LENGTH}
        phone={route.params.phone}
        cognitoUser={route.params.cognitoUser}
      />
    </DefaultLayout>
  );
};

export default CodeScreen;
