import { Settings } from 'entities';
import { EditViewerScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { Controller, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';
import { AppButton, AppInput, AppText, Tag } from 'shared/ui';
import { DefaultLayout, UploadAvatar } from 'widgets';

import { MIN_NAME_LENGTH } from '../config';
import { useUpdateProfileForm } from '../models';
import { useGetMeToEdit } from '../models/__generated__/getMeToEdit.query';
import styles from './editViewerScreen.styles';

const EditViewerScreen: FC<EditViewerScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { data } = useGetMeToEdit();

  const profileOldName = data?.me.name;
  const profileOldAvatar = data?.me.avatar?.image;
  const profileOldAvatarURL = data?.me.avatar?.imageUrl;
  const profileOldIntersts = data?.me.tags;
  const {
    actionsModalList,
    avatarUrl,
    isModalVisible,
    onToggleModalVisible,
    onDeleteAvatar,
    signedUrl,
    isUploadingImage,
    isError,
  } = UploadAvatar.useUploadAvatar({ oldImageUrl: profileOldAvatarURL });

  const { control, isValid, isSubmitting, onSubmit, watchName } = useUpdateProfileForm({
    oldName: profileOldName!,
    oldAvatar: profileOldAvatar,
  });

  const { field: imageField } = useController({ name: 'imageUrl', control });
  const { field: nameField } = useController({ name: 'name', control });
  const isNameChanged = watchName !== profileOldName;
  const isAvatarNotChanged = signedUrl ? profileOldAvatar === signedUrl : true;
  const isAnyFieldChanged = isNameChanged || !isAvatarNotChanged ? !isValid : true;

  const onButtonPress = () => {
    nameField.onChange(nameField.value.replace(/[-\s]+$/g, ''));
    if (signedUrl) {
      imageField.onChange(signedUrl);
    }
    onSubmit();
  };

  return (
    <DefaultLayout>
      <DefaultLayout.Header
        defaultBack
        onBackButtonPress={navigation.goBack}
        title={t('screens.EditProfile.title')}
      />
      <ScrollView contentContainerStyle={styles.root}>
        <View style={[styles.photo, { marginBottom: isError ? 2 : 20 }]}>
          <UploadAvatar.UI
            actionsModalList={actionsModalList}
            avatarUrl={avatarUrl}
            isModalVisible={isModalVisible}
            onToggleModalVisible={onToggleModalVisible}
            onDeleteAvatar={onDeleteAvatar}
          />
          {isError && <AppText style={styles.error}>{t('screens.EditProfile.photoError')}</AppText>}
        </View>
        <View style={styles.name}>
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
                placeholder={t('screens.EditProfile.namePlaceholder')}
                onChangeText={(text) => field.onChange(text.substring(0, 20))}
                onBlur={field.onBlur}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
        <AppButton.SimpleButton
          isDisabled={isAnyFieldChanged}
          isLoading={isUploadingImage || isSubmitting}
          onPress={onButtonPress}>
          {t('screens.EditProfile.btnSave')}
        </AppButton.SimpleButton>
        <View style={styles.interest}>
          <Settings.SettingItem
            onPress={() => NavigationService.navigate(AppRoutes.EditInterestsScreen)}
            text={t('screens.EditProfile.btnGoToInterests')}
          />
        </View>
        <View style={styles.tags}>
          {profileOldIntersts?.map((tag) => {
            return <Tag text={tag.title} key={tag.id} style={styles.tag} />;
          })}
        </View>
      </ScrollView>
    </DefaultLayout>
  );
};

export default EditViewerScreen;
