import { Subscribe } from 'entities';
import { Initiate } from 'features';
import { ProfileScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ComplainIcon } from 'shared/assets/svgs';
import useGetCustomer from 'shared/hooks/useGetCustomer';
import { AppButton, AppText, BottomModal, Tag } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { useBlockCustomer } from '../models';
import { ProfileSkeleton } from './components';
import styles from './profileScreen.styles';

const ProfileScreen: FC<ProfileScreenProps> = ({ navigation, route }) => {
  const { t } = useTranslation();

  const [isVisibleComplaintModal, setIsVisibleComplaintModal] = useState(false);
  const { handleCheckSubscribe, isVisibleModalSubscribe, onCloseModalSubscribe, hasPremiumSubscribe } =
    Subscribe.useCheckPremium();

  const { isMutual, userId, isFromMatch } = route.params;
  const { tags, loading, avatarImage, hiddenName } = useGetCustomer(userId);
  const { blockCustomer } = useBlockCustomer(userId!);

  const sendReport = () => {
    blockCustomer();
    setIsVisibleComplaintModal(false);
  };
  return loading ? (
    <DefaultLayout>
      <ProfileSkeleton />
    </DefaultLayout>
  ) : (
    <DefaultLayout>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <DefaultLayout.Header
          defaultBack
          onBackButtonPress={navigation.goBack}
          customRight={
            <AppButton.SquareButton Icon={ComplainIcon} onPress={() => setIsVisibleComplaintModal(true)} />
          }
        />
        <View style={styles.root}>
          <View style={styles.imageContainer}>
            <FastImage style={styles.image} source={{ uri: avatarImage }} />
          </View>
          <AppText style={styles.nameText}>{hiddenName}</AppText>
          <View style={styles.premiumBlock}>
            {hasPremiumSubscribe ? (
              <View style={styles.tags}>
                {tags.map((tag) => {
                  return <Tag text={tag.title} key={tag.id} style={styles.tag} />;
                })}
              </View>
            ) : (
              <Subscribe.PremiumButton onPress={() => handleCheckSubscribe(() => console.log('subscribe'))} />
            )}
            {!isMutual && userId && !isFromMatch && <Initiate.UI style={styles.button} customerId={userId} />}
          </View>
        </View>
        <Subscribe.ModalSubscribe isVisible={isVisibleModalSubscribe} onClose={onCloseModalSubscribe} />
        <BottomModal isVisible={isVisibleComplaintModal} onClose={() => setIsVisibleComplaintModal(false)}>
          <Text style={styles.modalTitle}>{t('screens.Profile.complaintModal.title')}</Text>
          <AppButton.SimpleButton
            style={styles.modalButton}
            variant="text"
            onPress={() => setIsVisibleComplaintModal(false)}>
            {t('screens.Profile.complaintModal.btnCancel')}
          </AppButton.SimpleButton>
          <AppButton.SimpleButton variant="secondary" onPress={sendReport}>
            {t('screens.Profile.complaintModal.btnReport')}
          </AppButton.SimpleButton>
        </BottomModal>
      </ScrollView>
    </DefaultLayout>
  );
};

export default ProfileScreen;
