import { useFocusEffect } from '@react-navigation/native';
import { Auth } from 'features';
import { SignInScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Linking, ScrollView, StatusBar, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import BACKGROUND_IMAGE from 'shared/assets/images/auth-background.png';
import { ENVIRONMENT, TERMS_URL } from 'shared/constants';
import AppRoutes from 'shared/routes';
import { colors } from 'shared/styles';
import { AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import styles from './sign-in-screen.styles';

const openTerms = () => {
  Linking.openURL(TERMS_URL);
};

const SignInScreen: FC<SignInScreenProps> = ({ navigation }) => {
  const { t } = useTranslation();
  const { isLoadingByGoogle, isLoadingByApple, isLoadingByPhone, isLoadingByFacebook } =
    Auth.useAuthContext();
  Auth.useNavigateAfterAuth();

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      changeNavigationBarColor(colors.primary.gradient2, false, false);

      return () => {
        StatusBar.setBarStyle('dark-content');
        changeNavigationBarColor(colors.grayscale[0], true, false);
      };
    }, []),
  );

  return (
    <ImageBackground source={BACKGROUND_IMAGE} style={[styles.fullScreen]} resizeMode="cover">
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <DefaultLayout customStyles={styles.layout}>
        <ScrollView contentContainerStyle={styles.fullScreen} bounces={false}>
          <View style={styles.head}>
            <AppText style={styles.headText}>{t('screens.SignIn.welcome')}</AppText>
          </View>

          <Auth.byPhone.PhoneForm style={styles.formWrapper} />

          <View>
            <Auth.byFacebook.Button style={styles.buttonWrapper} />
            <Auth.byGoogle.Button style={styles.buttonWrapper} />
            <Auth.byApple.Button style={styles.buttonWrapper} />
          </View>

          <AppText style={styles.agreementsText}>
            {t('screens.SignIn.agreements.text')}
            <AppText onPress={openTerms} style={styles.agreementsLink}>
              {t('screens.SignIn.agreements.privacy')}
            </AppText>
            {t('screens.SignIn.agreements.and')}
            <AppText onPress={openTerms} style={styles.agreementsLink}>
              {t('screens.SignIn.agreements.terms')}
            </AppText>
          </AppText>
          {ENVIRONMENT === 'development' && (
            <AppText style={styles.uikit} onPress={() => navigation.navigate(AppRoutes.UIKitScreen)}>
              UI-KIT
            </AppText>
          )}
        </ScrollView>
      </DefaultLayout>

      {(isLoadingByGoogle || isLoadingByApple || isLoadingByPhone || isLoadingByFacebook) && (
        <View style={styles.disableScreenWrapper} />
      )}
    </ImageBackground>
  );
};

export default SignInScreen;
