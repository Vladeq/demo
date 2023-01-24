import React, { FC } from 'react';
import { Controller, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppButton, AppInput } from 'shared/ui';

import { MIN_NAME_LENGTH } from '../../../config';
import { useCreateAccountForm } from '../../../models';
import { StepComponentsProps } from '../../../types';
import styles from './enterName.styles';

const EnterName: FC<StepComponentsProps> = ({ handleButtonPress }) => {
  const { t } = useTranslation();
  const { control, isSubmitting, isValid } = useCreateAccountForm();
  const { field: nameField } = useController({ name: 'name', control });

  const onButtonPress = () => {
    nameField.onChange(nameField.value.replace(/[-\s]+$/g, ''));
    handleButtonPress();
  };

  return (
    <View style={styles.root}>
      <Controller
        control={control}
        name="name"
        rules={{
          minLength: { value: MIN_NAME_LENGTH, message: t('validation.minNameLength') },
          pattern: {
            value: /^[a-z]+[\s-]?[a-z]*$/i,
            message: t('validation.incorrectNameFormat'),
          },
          required: true,
        }}
        render={({ field, fieldState }) => (
          <AppInput.TextField
            value={field.value}
            placeholder={t('screens.CreateAccount.form.namePlaceholder')}
            onChangeText={(text) => field.onChange(text.substring(0, 20))}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <AppButton.SimpleButton isDisabled={!isValid} isLoading={isSubmitting} onPress={onButtonPress}>
        {t('screens.CreateAccount.form.btnContinue')}
      </AppButton.SimpleButton>
    </View>
  );
};

export default EnterName;
