import { Account } from 'entities';
import React, { FC, useState } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppButton, AppText } from 'shared/ui';

import { useCreateAccountForm } from '../../../models';
import { StepComponentsProps } from '../../../types';
import styles from './interests.styles';

const Interests: FC<StepComponentsProps> = ({ handleButtonPress }) => {
  const { t } = useTranslation();
  const { control, isSubmitting } = useCreateAccountForm();
  const [activeTagsArray, setActiveTagsArray] = useState<string[]>([]);
  const { field } = useController({ name: 'tags', control });
  const checkOnPress = () => {
    field.onChange(activeTagsArray);
    handleButtonPress();
  };

  const isLess = activeTagsArray.length < 5;

  return (
    <View style={styles.root}>
      <View style={styles.inner}>
        <AppText style={isLess ? styles.infoError : styles.info}>
          {t('screens.CreateAccount.step3.info')}
        </AppText>
        <Account.SelectInterests activeTags={activeTagsArray} setActiveTags={setActiveTagsArray} />
      </View>

      <AppButton.SimpleButton isDisabled={isLess} isLoading={isSubmitting} onPress={checkOnPress}>
        {t('screens.CreateAccount.form.btnContinue')}
      </AppButton.SimpleButton>
    </View>
  );
};

export default Interests;
