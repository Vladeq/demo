import BottomSheet, { BottomSheetModal } from '@gorhom/bottom-sheet';
import { MyPin } from 'entities/map/ui';
import { PositionType } from 'features/location/model/positionVar';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, Platform, Text, View } from 'react-native';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users } from 'shared/assets/svgs';
import { TAB_BAR_BORDER_RADIUS, TAB_BAR_HEIGHT } from 'shared/constants';
import { CustomerGetByIds } from 'shared/qraphql/mututions/__generated__/customerGetByIds.query';
import { colors } from 'shared/styles';
import { ArrayElem, UsersAsPinsType } from 'shared/types';
import { UserCard } from 'widgets';

import UserMarker from '../UserMarker';
import styles from './map-tab.style';

type MapTabProps = {
  users?: CustomerGetByIds['customerGetByIds'];
  pins?: UsersAsPinsType[];
  position: PositionType | null;
};

const keyExtractor = (item: ArrayElem<CustomerGetByIds['customerGetByIds']>) => item.id;
const ANCHOR = { x: 0.5, y: 0.5 };

const MapTab: FC<MapTabProps> = ({ users, pins, position }) => {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState<number>(185);
  const [selectedMarkerId, setSelectedMarkerId] = useState<string | null>(null);

  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const mapViewPef = useRef<MapView | null>(null);
  const bottomSheetModalRef = useRef<BottomSheetModal | null>(null);

  const MIN_BOTTON_SHEET_HEIGHT = 47 + TAB_BAR_BORDER_RADIUS;
  const MAX_BOTTON_SHEET_HEIGHT = bottomSheetHeight + TAB_BAR_BORDER_RADIUS * 2 + 28 + 16;
  const MAP_SCALE = 0.001;

  const snapPoints = useMemo(
    () => [MIN_BOTTON_SHEET_HEIGHT, MAX_BOTTON_SHEET_HEIGHT],
    [MIN_BOTTON_SHEET_HEIGHT, MAX_BOTTON_SHEET_HEIGHT],
  );

  const selectedUser = useMemo(
    () => users?.filter((user) => user.id === selectedMarkerId),
    [selectedMarkerId, users],
  );

  const handleSheetAnimate = useCallback((index: number) => {
    setIsOpenBottomSheet(Boolean(index));
  }, []);

  const handleSelectMarker = (id: string) => {
    bottomSheetModalRef.current?.snapToIndex(1);
    setSelectedMarkerId(id);
  };

  const handleUnselectMarker = () => {
    bottomSheetModalRef.current?.snapToIndex(0);
    setSelectedMarkerId(null);
  };

  const renderItem = useCallback(({ item }: { item: ArrayElem<CustomerGetByIds['customerGetByIds']> }) => {
    return (
      <UserCard.UI
        key={item.id}
        customerId={item.id}
        avatarUrl={item.avatar?.imageUrl}
        style={styles.user}
        variant="small"
        onLayout={(e) => setBottomSheetHeight(e.nativeEvent.layout.height)}
      />
    );
  }, []);

  useEffect(() => {
    position &&
      mapViewPef.current?.animateToRegion(
        {
          latitude: position.lat,
          longitude: position.long,
          latitudeDelta: MAP_SCALE,
          longitudeDelta: MAP_SCALE,
        },
        500,
      );
  }, [position]);

  if (!position) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <MapView
        ref={mapViewPef}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
        onPress={handleUnselectMarker}
        initialRegion={{
          latitude: position.lat,
          longitude: position.long,
          latitudeDelta: MAP_SCALE,
          longitudeDelta: MAP_SCALE,
        }}>
        {Platform.OS === 'ios' && (
          <Marker coordinate={{ latitude: position.lat, longitude: position.long }} anchor={ANCHOR}>
            <MyPin />
          </Marker>
        )}
        {pins?.map((pin) => (
          <UserMarker key={pin.id} onPress={handleSelectMarker} pin={pin} />
        ))}
      </MapView>
      {Platform.OS === 'android' && (
        <View style={styles.myPin}>
          <MyPin />
        </View>
      )}

      <BottomSheet
        index={0}
        ref={bottomSheetModalRef}
        snapPoints={snapPoints}
        onChange={handleSheetAnimate}
        containerStyle={[
          styles.bottomSheetStyle,
          { marginBottom: TAB_BAR_HEIGHT + insets.bottom - TAB_BAR_BORDER_RADIUS },
        ]}
        handleIndicatorStyle={{ backgroundColor: colors.grayscale[40] }}>
        <View style={styles.contentContainer}>
          <NativeViewGestureHandler disallowInterruption={true}>
            {isOpenBottomSheet && users ? (
              users.length ? (
                <FlatList
                  contentContainerStyle={styles.usersContainer}
                  data={selectedUser?.length ? selectedUser : users}
                  renderItem={renderItem}
                  keyExtractor={keyExtractor}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              ) : (
                <View style={styles.emptyUsersContainer}>
                  <Users />
                  <Text style={styles.emptyUsersText}>{t('screens.Home.MapTab.emptyUsersText')}</Text>
                </View>
              )
            ) : (
              <View>
                <Text>{t('screens.Home.MapTab.peopleNearby', { length: users?.length || 0 })}</Text>
                <ActivityIndicator size="large" style={styles.loader} color="grey" />
              </View>
            )}
          </NativeViewGestureHandler>
        </View>
      </BottomSheet>
    </>
  );
};

export default MapTab;
