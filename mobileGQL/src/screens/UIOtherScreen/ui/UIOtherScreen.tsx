import { History, Map, Settings, Subscribe, Toaster } from 'entities';
import { UIOtherScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SettingsIcon } from 'shared/assets/svgs';
import { colors, sizes, typography } from 'shared/styles';
import {
  ActionSheet,
  ActionSheetItemType,
  AppButton,
  BottomModal,
  SubscribeStatusBadge,
  Tag,
} from 'shared/ui';
import { DefaultLayout } from 'widgets';
import { UploadAvatar, UserCard } from 'widgets';

const TAGS = ['Photography', 'Music', 'Travel', 'Movie', 'Comedy', 'DIY', 'Social media'];
const TEST_IMG_URI = 'https://unsplash.it/400/400?image=1';
const ACTION_SHEET_LIST: ActionSheetItemType[] = [
  { text: 'Take a photo', onPress: () => Alert.alert('Click', 'Take a photo') },
  { text: 'Open gallery', onPress: () => Alert.alert('Click', 'Open gallery') },
];

const UIOtherScreen: FC<UIOtherScreenProps> = () => {
  const [activeTagsArray, setActiveTagsArray] = useState<string[]>([TAGS[0]]);
  const [isVisibleBottomModal, setIsVisibleBottomModal] = useState(false);
  const [isVisibleActionSheet, setIsVisibleActionSheet] = useState(false);
  const [isActiveSwitch, setIsActiveSwitch] = useState(false);

  const { handleCheckSubscribe, isVisibleModalSubscribe, onCloseModalSubscribe } =
    Subscribe.useCheckPremium();
  const { isModalVisible, actionsModalList, avatarUrl, onDeleteAvatar, onToggleModalVisible } =
    UploadAvatar.useUploadAvatar({});

  const { showToast } = Toaster.useCallToast();

  return (
    <DefaultLayout>
      <ScrollView>
        <Text>Tags</Text>
        <View style={styles.tags}>
          <Tag text="Books" style={styles.tag} />
          {TAGS.map((tag) => {
            return (
              <Tag
                text={tag}
                key={tag}
                style={styles.tag}
                isActive={activeTagsArray.includes(tag)}
                onPress={() => {
                  if (activeTagsArray.includes(tag)) {
                    setActiveTagsArray((prev) => prev.filter((item) => item !== tag));
                  } else {
                    setActiveTagsArray((prev) => [...prev, tag]);
                  }
                }}
              />
            );
          })}
        </View>
        <Text>Subscribe status badge</Text>
        <View style={styles.subscribe}>
          <SubscribeStatusBadge isPremium />
          <SubscribeStatusBadge isPremium={false} />
        </View>
        <AppButton.SimpleButton style={styles.modalButton} onPress={() => setIsVisibleBottomModal(true)}>
          Open Bottom Modal
        </AppButton.SimpleButton>
        <AppButton.SimpleButton
          style={styles.modalButton}
          variant="delete"
          onPress={() => handleCheckSubscribe(() => console.log('subscribe'))}>
          Open Subscribe Modal
        </AppButton.SimpleButton>
        <AppButton.SimpleButton style={styles.modalButton} onPress={() => setIsVisibleActionSheet(true)}>
          Open Action Sheet
        </AppButton.SimpleButton>

        <AppButton.SimpleButton style={styles.modalButton} variant="delete" onPress={() => showToast()}>
          Show Toaster Error
        </AppButton.SimpleButton>

        <AppButton.SimpleButton
          style={styles.modalButton}
          variant="secondary"
          onPress={() => showToast('Something went wrong. Please try again', 'info')}>
          Show Toaster Info
        </AppButton.SimpleButton>

        <Text>Map Pin</Text>
        <View style={styles.tags}>
          <Map.MapPin
            style={styles.mapPin}
            uri="https://www.meme-arsenal.com/memes/db8f8b17992d34e6c0a23caaa7087f84.jpg"
          />
          <Map.MapPin uri={undefined} />
        </View>

        <Text>Pin</Text>
        <View style={styles.map}>
          <Map.MyPin />
        </View>

        <Settings.SettingItem onPress={() => null} text="Settings" />
        <Settings.SettingItem
          onPress={() => null}
          text="Settings"
          IconComponent={SettingsIcon}
          iconColor={colors.additional.error}
        />
        <Settings.SettingItemToggler
          text="Settings"
          isActiveSwitch={isActiveSwitch}
          onToggleSwitch={() => setIsActiveSwitch(!isActiveSwitch)}
          description="You just got a new initiate"
        />

        <View
          style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <UserCard.UI customerId="1" avatarUrl={TEST_IMG_URI} />
          <UserCard.UI customerId="2" avatarUrl={undefined} variant="small" />
        </View>

        <View
          style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
          <UploadAvatar.UI
            actionsModalList={actionsModalList}
            avatarUrl={avatarUrl}
            isModalVisible={isModalVisible}
            onDeleteAvatar={onDeleteAvatar}
            onToggleModalVisible={onToggleModalVisible}
          />

          <UploadAvatar.UI
            variant="small"
            isLoading
            actionsModalList={actionsModalList}
            avatarUrl={avatarUrl}
            isModalVisible={isModalVisible}
            onDeleteAvatar={onDeleteAvatar}
            onToggleModalVisible={onToggleModalVisible}
          />
        </View>

        <History.UI
          avatarUrl={TEST_IMG_URI}
          name="Someone"
          lastTimeText="2 days ago"
          isMutual={false}
          isSuperLike={false}
        />

        <Subscribe.PremiumButton />
      </ScrollView>

      <BottomModal isVisible={isVisibleBottomModal} onClose={() => setIsVisibleBottomModal(false)}>
        <Text style={styles.modalText}>Are you sure you want to delete your account? </Text>
        <AppButton.SimpleButton
          style={styles.modalButton}
          variant="text"
          onPress={() => setIsVisibleBottomModal(false)}>
          Cancel
        </AppButton.SimpleButton>
        <AppButton.SimpleButton variant="delete" onPress={() => setIsVisibleBottomModal(false)}>
          Delete
        </AppButton.SimpleButton>
      </BottomModal>

      <ActionSheet
        list={ACTION_SHEET_LIST}
        onClose={() => setIsVisibleActionSheet(false)}
        isVisible={isVisibleActionSheet}
      />
      <Subscribe.ModalSubscribe isVisible={isVisibleModalSubscribe} onClose={onCloseModalSubscribe} />
    </DefaultLayout>
  );
};

export default UIOtherScreen;

const styles = StyleSheet.create({
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 10,
  },
  tag: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
  subscribe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 30,
  },
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.body2_medium,
  },
  modalButton: {
    marginVertical: 12,
  },
  mapPin: {
    marginRight: 10,
  },
  map: {
    height: sizes.screen.height,
    backgroundColor: colors.grayscale[20],
  },
});
