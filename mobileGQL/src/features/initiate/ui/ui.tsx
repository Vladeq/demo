import { Subscribe } from 'entities';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacityProps } from 'react-native';
import { AppButton } from 'shared/ui';

import { useInitiate } from '../model';

type InitiateButtonProps = TouchableOpacityProps & {
  customerId: string;
};

const InitiateButton: FC<InitiateButtonProps> = ({ customerId, ...props }) => {
  const { isInitiateLoading, isVisibleModalSubscribe, onCloseModalSubscribe, onPressInitiate, isDisabled } =
    useInitiate(customerId);
  const { t } = useTranslation();

  return (
    <>
      <AppButton.ButtonGradient
        {...props}
        isDisabled={isDisabled}
        style={props.style}
        onPress={onPressInitiate}
        isLoading={isInitiateLoading}>
        {t('features.initiate.InitiateButton.Initiate')}
      </AppButton.ButtonGradient>
      <Subscribe.ModalSubscribe isVisible={isVisibleModalSubscribe} onClose={onCloseModalSubscribe} />
    </>
  );
};

export default InitiateButton;
