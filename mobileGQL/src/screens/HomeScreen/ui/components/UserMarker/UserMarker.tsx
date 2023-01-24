import { MapPin } from 'entities/map/ui';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { AnimatedRegion, MapMarker, Marker, MarkerAnimated } from 'react-native-maps';
import { UsersAsPinsType } from 'shared/types';

type UserMarkerProps = {
  pin: UsersAsPinsType;
  onPress: (id: string) => void;
};

const MAP_SCALE = 0.001;
const ANCHOR = { x: 0.5, y: 0.5 };

const UserMarker: FC<UserMarkerProps> = ({ pin, onPress }) => {
  // const markerPef = useRef<MapMarker | null>(null);
  const [marker, setMarker] = useState<MapMarker | null>(null);

  const [coords] = useState<AnimatedRegion>(
    new AnimatedRegion({
      latitude: pin.lat,
      longitude: pin.long,
      latitudeDelta: MAP_SCALE,
      longitudeDelta: MAP_SCALE,
    }),
  );
  const pinRef = useRef<UsersAsPinsType>(pin);

  // useEffect(() => {
  //   // if (Platform.OS === 'android') {
  //   //   markerPef.current?.animateMarkerToCoordinate({ latitude: pin.lat, longitude: pin.long }, duration);
  //   // } else {
  //   coords
  //     .timing({
  //       latitude: pin.lat,
  //       longitude: pin.long,
  //       latitudeDelta: MAP_SCALE,
  //       longitudeDelta: MAP_SCALE,
  //       toValue: 1,
  //       duration,
  //       useNativeDriver: false,
  //     })
  //     .start();
  //   // }
  // }, [pin, coords]);

  useEffect(() => {
    if (pin.lat !== pinRef.current.lat || pin.long !== pinRef.current.long) {
      animateMarker();
      pinRef.current = pin;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin]);

  const animateMarker = () => {
    const newCoord = {
      latitude: pin.lat,
      longitude: pin.long,
      // latitudeDelta: MAP_SCALE,
      // longitudeDelta: MAP_SCALE,
    };

    if (Platform.OS === 'android') {
      if (marker) {
        marker.animateMarkerToCoordinate(newCoord, 2000);
      }
    } else {
      // coords
      //   .timing({
      //     ...newCoord,
      //     toValue: 1,
      //     duration: 1000,
      //     useNativeDriver: false,
      //     easing: Easing.linear,
      //   })
      //   .start();
    }
  };

  return Platform.OS === 'android' ? (
    <MarkerAnimated
      key={pin.id}
      onPress={() => onPress(pin.id)}
      ref={(markerRef: MapMarker) => setMarker(markerRef)}
      // @ts-ignore
      coordinate={coords}
      anchor={ANCHOR}>
      <MapPin uri={pin.avatarImage} />
    </MarkerAnimated>
  ) : (
    <Marker
      onPress={() => onPress(pin.id)}
      key={pin.id}
      coordinate={{ latitude: pin.lat, longitude: pin.long }}
      anchor={ANCHOR}>
      <MapPin uri={pin.avatarImage} />
    </Marker>
  );
};

export default UserMarker;
