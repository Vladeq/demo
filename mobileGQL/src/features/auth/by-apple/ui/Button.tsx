import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { AppleIcon } from 'shared/assets/svgs';

import { useAuthContext } from '../../models';
import { SocialButton } from '../../ui';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({ style }) => {
  const { t } = useTranslation();
  const { isLoadingByApple, appleSignIn } = useAuthContext();

  return (
    <SocialButton
      style={style}
      Icon={AppleIcon}
      text={t('features.auth.apple')}
      onPress={appleSignIn}
      isLoading={isLoadingByApple}
    />
  );
};

export default Button;
