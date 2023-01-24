import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View, ViewProps } from 'react-native';
import { AppButton, AppInput } from 'shared/ui';

import { PHONE_LENGTH } from '../../config';
import { useAuthForm } from '../../models';

const AuthForm: FC<ViewProps> = (props) => {
  const { t } = useTranslation();
  const { control, watchPhone, onSubmit, isSubmitting } = useAuthForm();

  return (
    <View {...props}>
      <Controller
        control={control}
        name="phone"
        rules={{ minLength: { value: PHONE_LENGTH, message: t('validation.incorrectPhoneFormat') } }}
        render={({ field, fieldState }) => (
          <AppInput.PhoneField
            phoneLength={PHONE_LENGTH}
            label={t('features.auth.form.phone')}
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            error={fieldState.error?.message}
          />
        )}
      />
      <AppButton.SimpleButton
        isDisabled={watchPhone.length < PHONE_LENGTH}
        isLoading={isSubmitting}
        onPress={onSubmit}>
        {t('features.auth.form.continue')}
      </AppButton.SimpleButton>
    </View>
  );
};

export default AuthForm;
