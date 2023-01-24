import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleProp, ViewStyle } from 'react-native';
import { FacebookIcon } from 'shared/assets/svgs';

import { useAuthContext } from '../../models';
import { SocialButton } from '../../ui';

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({ style }) => {
  const { t } = useTranslation();
  const { isLoadingByFacebook, facebookSignIn } = useAuthContext();

  return (
    <SocialButton
      style={style}
      Icon={FacebookIcon}
      text={t('features.auth.facebook')}
      onPress={facebookSignIn}
      isLoading={isLoadingByFacebook}
    />
  );
};

export default Button;
