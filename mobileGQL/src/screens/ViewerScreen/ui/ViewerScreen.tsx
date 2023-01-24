import { ViewerScreenProps } from 'processes/navigation/main-tab/MainTabNavigator';
import React, { FC, useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EditIcon } from 'shared/assets/svgs';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import AppRoutes from 'shared/routes';
import { globalStyle } from 'shared/styles';
import { AppButton, AppText, Skeleton, Tag } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { useGetData } from '../model';
import { Header, Menu } from './components';
import styles from './viewer-screen.styles';

const ViewerScreen: FC<ViewerScreenProps> = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { viewer, initiateLeft, superLikesLeft, loadingViewer, loadingInitiateLeft, loadingSuperLikesLeft } =
    useGetData();

  return (
    <DefaultLayout withHorizontalPadding={false}>
      <ScrollView contentContainerStyle={styles.root} bounces={false} showsVerticalScrollIndicator={false}>
        <Header
          isPremium={viewer?.isPremium}
          initiateCount={initiateLeft}
          superLikeCount={superLikesLeft}
          isLoadingData={loadingInitiateLeft || loadingSuperLikesLeft || loadingViewer}
        />

        <View style={styles.avatarWrapper}>
          <FastImage style={styles.image} source={{ uri: viewer?.avatar?.imageUrl }} resizeMode="cover" />
          <AppButton.IconButton
            Icon={EditIcon}
            style={styles.editButton}
            onPress={() => navigation.navigate(AppRoutes.EditViewerScreen)}
          />
        </View>
        {loadingViewer ? (
          <Skeleton.Container>
            <View style={styles.skeletonUserName} />
          </Skeleton.Container>
        ) : (
          <AppText style={styles.userName} numberOfLines={1}>
            {viewer?.name}
          </AppText>
        )}

        <ScrollView
          horizontal
          contentContainerStyle={styles.tagsWrapper}
          showsHorizontalScrollIndicator={false}
          bounces={false}>
          {useMemo(() => {
            return loadingViewer ? (
              <Skeleton.Container>
                <View style={styles.row}>
                  <Skeleton.Item width={80} height={32} borderRadius={24} />
                  <Skeleton.Item width={80} height={32} borderRadius={24} marginLeft={12} />
                  <Skeleton.Item width={80} height={32} borderRadius={24} marginLeft={12} />
                  <Skeleton.Item width={80} height={32} borderRadius={24} marginLeft={12} />
                </View>
              </Skeleton.Container>
            ) : (
              viewer?.tags.map((interest) => (
                <Tag key={interest.id} text={interest.title} style={styles.tag} />
              ))
            );
          }, [loadingViewer, viewer?.tags])}
        </ScrollView>

        <View style={styles.divider} />

        <Menu />
      </ScrollView>
      <View style={[globalStyle.tabBarShadow, { height: TAB_BAR_HEIGHT + insets.bottom }]} />
    </DefaultLayout>
  );
};

export default React.memo(ViewerScreen);
