import { Location } from 'features';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { LocationPlace } from 'shared/assets/svgs';
import { AppButton, AppText } from 'shared/ui';

import { useCreateAccountForm } from '../../../models';
import { StepComponentsProps } from '../../../types';
import styles from './addLocation.styles';

const AddLocation: FC<StepComponentsProps> = ({ handleButtonPress }) => {
  const [isHasPermissions, setIsHasPermissions] = useState<boolean | undefined>();

  const { t } = useTranslation();
  const { isSubmitting, isValid, onSubmit } = useCreateAccountForm();
  const { getPermissions } = Location.useLocation();
  const onCompletePress = () => {
    onSubmit();
    handleButtonPress();
  };
  const onAllowPress = async () => {
    const permission = await getPermissions();
    setIsHasPermissions(permission);
  };

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <LocationPlace />
        <AppText style={styles.title}>{t('screens.CreateAccount.step4.enable')}</AppText>
        <AppText style={styles.info}>{t('screens.CreateAccount.step4.enableInfo')}</AppText>
      </View>

      {!(isHasPermissions === undefined) ? (
        <AppButton.SimpleButton isDisabled={!isValid} isLoading={isSubmitting} onPress={onCompletePress}>
          {t('screens.CreateAccount.btnComplete')}
        </AppButton.SimpleButton>
      ) : (
        <AppButton.SimpleButton isDisabled={!isValid} isLoading={isSubmitting} onPress={onAllowPress}>
          {t('screens.CreateAccount.btnAllowLocation')}
        </AppButton.SimpleButton>
      )}
    </View>
  );
};

export default AddLocation;
