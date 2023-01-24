import { logout } from 'features/auth/models';
import { CreateAccountScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { usePagerView } from 'shared/hooks';
import AppRoutes from 'shared/routes';
import { NavigationService } from 'shared/services';
import { AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { steps } from '../config';
import { CreateAccountForm } from '../types';
import { AddLocation, AddPhoto, EnterName, Interests, StatusBars } from './components';
import styles from './createAccountScreen.styles';

const CreateAccountScreen: FC<CreateAccountScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { currentStep, handleNextPage, handlePrevPage, pagerViewRef, onPageSelected } = usePagerView();
  const methods = useForm<CreateAccountForm>({
    defaultValues: { name: '', tags: [], imageUrl: '' },
    mode: 'onChange',
  });
  const goToOnboarding = () => {
    navigation.navigate(AppRoutes.OnboardingScreen);
  };

  const handleGoBack = async () => {
    if (currentStep === 0) {
      await logout();
      NavigationService.reset([{ name: AppRoutes.SignInScreen }]);
    } else {
      handlePrevPage();
    }
  };

  return (
    <DefaultLayout>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <DefaultLayout.Header defaultBack onBackButtonPress={handleGoBack} />
        <View style={styles.statusBarsWrapper}>
          <StatusBars activeSlide={currentStep} />
        </View>
        <FormProvider {...methods}>
          <PagerView
            style={styles.container}
            initialPage={0}
            ref={pagerViewRef}
            scrollEnabled={false}
            onPageSelected={onPageSelected}>
            <View key={0}>
              <AppText style={styles.title}>{t(steps[0].titleKey) as string}</AppText>
              <EnterName handleButtonPress={handleNextPage} />
            </View>
            <View key={1}>
              <AppText style={styles.title}>{t(steps[1].titleKey) as string}</AppText>
              <AddPhoto handleButtonPress={handleNextPage} />
            </View>
            <View key={2}>
              <AppText style={styles.titleStep3}>{t(steps[2].titleKey) as string}</AppText>
              <Interests handleButtonPress={handleNextPage} />
            </View>
            <View key={3}>
              <AddLocation handleButtonPress={goToOnboarding} />
            </View>
          </PagerView>
        </FormProvider>
      </KeyboardAvoidingView>
    </DefaultLayout>
  );
};

export default CreateAccountScreen;
