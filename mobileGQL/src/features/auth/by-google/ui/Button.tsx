import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { GoogleIcon } from 'shared/assets/svgs';

import { useAuthContext } from '../../models';
import { SocialButton } from '../../ui';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({ style }) => {
  const { t } = useTranslation();
  const { isLoadingByGoogle, googleSignIn } = useAuthContext();

  return (
    <SocialButton
      style={style}
      Icon={GoogleIcon}
      text={t('features.auth.google')}
      onPress={googleSignIn}
      isLoading={isLoadingByGoogle}
    />
  );
};

export default Button;
