import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppButton } from 'shared/ui';
import { UploadAvatar } from 'widgets';

import { useCreateAccountForm } from '../../../models';
import { StepComponentsProps } from '../../../types';
import styles from './addPhoto.styles';

const AddPhoto: FC<StepComponentsProps> = ({ handleButtonPress }) => {
  const { t } = useTranslation();
  const { control, isSubmitting } = useCreateAccountForm();
  const {
    actionsModalList,
    avatarUrl,
    isModalVisible,
    onToggleModalVisible,
    onDeleteAvatar,
    signedUrl,
    isUploadingImage,
  } = UploadAvatar.useUploadAvatar({});
  const { field } = useController({ name: 'imageUrl', control });

  const onButtonPress = () => {
    field.onChange(signedUrl);
    handleButtonPress();
  };

  return (
    <View style={styles.root}>
      <View style={styles.uploader}>
        <UploadAvatar.UI
          actionsModalList={actionsModalList}
          avatarUrl={avatarUrl}
          isModalVisible={isModalVisible}
          onToggleModalVisible={onToggleModalVisible}
          onDeleteAvatar={onDeleteAvatar}
        />
      </View>

      <AppButton.SimpleButton
        isDisabled={!signedUrl && !isUploadingImage}
        isLoading={isSubmitting || isUploadingImage}
        onPress={onButtonPress}>
        {t('screens.CreateAccount.form.btnContinue')}
      </AppButton.SimpleButton>
    </View>
  );
};

export default AddPhoto;
