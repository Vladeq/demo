import { Subscribe } from 'entities';
import { MatchScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, StatusBar, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import DEFAULT_AVATAR from 'shared/assets/images/default-user-avatar.png';
import BACKGROUND_IMAGE from 'shared/assets/images/match-background.png';
import { CloseIcon } from 'shared/assets/svgs';
import useGetCustomer from 'shared/hooks/useGetCustomer';
import AppRoutes from 'shared/routes';
import { AppButton } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { MatchSkeleton } from './components';
import styles from './match-screen.style';

const MatchScreen: FC<MatchScreenProps> = ({ navigation, route }) => {
  const { handleCheckSubscribe, isVisibleModalSubscribe, onCloseModalSubscribe, hasPremiumSubscribe } =
    Subscribe.useCheckPremium();
  const { userId } = route.params;

  const { avatarImage, hiddenName, loading: isMatchLoading } = useGetCustomer(userId);

  const { t } = useTranslation();

  const onNavigateToProfile = () =>
    navigation.navigate(AppRoutes.ProfileScreen, { userId, isFromMatch: true });

  if (isMatchLoading) {
    return (
      <DefaultLayout>
        <MatchSkeleton />
      </DefaultLayout>
    );
  }
  return (
    <>
      <ImageBackground style={styles.background} source={BACKGROUND_IMAGE} resizeMode="cover">
        <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
        <DefaultLayout customStyles={styles.layoutContainer}>
          <DefaultLayout.Header
            customRight={
              <View style={styles.close}>
                <CloseIcon />
              </View>
            }
            onRightButtonPress={() => navigation.goBack()}
          />

          <View style={styles.wrapper}>
            <View style={styles.infoContainer}>
              <View style={styles.avatar}>
                <FastImage
                  style={styles.image}
                  source={avatarImage ? { uri: avatarImage } : DEFAULT_AVATAR}
                  resizeMode="cover"
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.title}>{t('screens.Match.title')}</Text>
                <Text style={[styles.description, { marginBottom: 32 }]}>
                  {t('screens.Match.youAnd')}
                  <Text style={styles.boldText}>{` ${hiddenName} `}</Text>
                  {t('screens.Match.description')}
                </Text>
                <Text style={[styles.description, { marginBottom: 8 }]}>
                  {t('screens.Match.maybe')}(<Text style={styles.boldText}>{` ${hiddenName}`}</Text>)
                </Text>
                <Text style={styles.boldText}>{t('screens.Match.goodLuck')}</Text>
              </View>
            </View>

            <AppButton.SimpleButton onPress={() => handleCheckSubscribe(onNavigateToProfile)}>
              {hasPremiumSubscribe ? t('screens.Match.seeProfile') : t('screens.Match.goPremium')}
            </AppButton.SimpleButton>
          </View>
        </DefaultLayout>
      </ImageBackground>

      <Subscribe.ModalSubscribe isVisible={isVisibleModalSubscribe} onClose={onCloseModalSubscribe} />
    </>
  );
};

export default MatchScreen;
