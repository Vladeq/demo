import { Account } from 'entities';
import { EditInterestsScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { AppButton, AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { useInterest, useUpdateInterestsForm } from '../models';
import styles from './editInterstsScreen.styles';

const EditInterestsScreen: FC<EditInterestsScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();

  const { activeTagsArray, isNoChanges, setActiveTagsArray } = useInterest();

  const { control, isSubmitting, onSubmit } = useUpdateInterestsForm({
    oldInterests: activeTagsArray || [],
  });
  const { field } = useController({ name: 'interests', control });
  const onPressHandler = () => {
    field.onChange(activeTagsArray);
    onSubmit();
  };
  const isLess = activeTagsArray.length < 5;

  return (
    <DefaultLayout>
      <DefaultLayout.Header
        defaultBack
        onBackButtonPress={navigation.goBack}
        title={t('screens.EditInterests.title')}
      />
      <View style={styles.root}>
        <View style={styles.inner}>
          <AppText style={isLess ? styles.infoError : styles.info}>
            {t('screens.CreateAccount.step3.info')}
          </AppText>
          <Account.SelectInterests activeTags={activeTagsArray} setActiveTags={setActiveTagsArray} />
        </View>
        <AppButton.SimpleButton
          isDisabled={isLess || isNoChanges}
          isLoading={isSubmitting}
          onPress={onPressHandler}>
          {t('screens.EditProfile.btnSave')}
        </AppButton.SimpleButton>
      </View>
    </DefaultLayout>
  );
};

export default EditInterestsScreen;
