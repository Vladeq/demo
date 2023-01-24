import { Toaster } from 'entities';
import { passwordlessSignIn } from 'features/auth/models';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { AppButton, AppText } from 'shared/ui';

import { RESEND_CODE_TIMER } from '../../../config';
import { useResendTimer } from '../../../models';
import styles from './resend-timer.styles';

type ResendTimerProps = {
  isSubmitting: boolean;
  phone: string;
};

const ResendTimer: FC<ResendTimerProps> = ({ isSubmitting, phone }) => {
  const { t } = useTranslation();
  const { resendTimer, setResendTimer } = useResendTimer();
  const { showToast } = Toaster.useCallToast();

  const onResend = async () => {
    try {
      setResendTimer(RESEND_CODE_TIMER);
      await passwordlessSignIn(phone);
    } catch (e) {
      // TODO: remove console.log
      console.log('e from resend: ', e);
      showToast(t('errors.unknownError'));
    }
  };

  return (
    <>
      <AppButton.SimpleButton
        variant="text"
        onPress={onResend}
        isDisabled={resendTimer > 0}
        isLoading={isSubmitting}>
        <AppText style={[styles.button, resendTimer > 0 && styles.buttonDisabled]}>
          {t('features.changePhone.resendCode')}
        </AppText>
      </AppButton.SimpleButton>

      {!isSubmitting && resendTimer > 0 && (
        <AppText style={styles.timer}>{resendTimer > 9 ? `00:${resendTimer}` : `00:0${resendTimer}`}</AppText>
      )}
    </>
  );
};

export default ResendTimer;
