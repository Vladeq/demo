import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import FastImage from 'react-native-fast-image';
import DEFAULT_AVATAR from 'shared/assets/images/default-user-avatar.png';

import styles from './map-pin.styles';

type MapPinProps = ViewProps & {
  uri: string | undefined;
};

const MapPin: FC<MapPinProps> = ({ uri, ...props }) => {
  return (
    <View {...props} style={[styles.zone, props.style]}>
      <View style={styles.imageWrapper}>
        <FastImage style={styles.image} source={uri ? { uri } : DEFAULT_AVATAR} resizeMode="cover" />
      </View>
    </View>
  );
};

export default MapPin;
