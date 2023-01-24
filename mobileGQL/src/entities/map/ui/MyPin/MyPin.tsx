/* eslint-disable react-native/no-inline-styles */

import React, { FC, memo, useEffect } from 'react';
import { Platform, View, ViewProps } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { MyPinIcon } from 'shared/assets/svgs';

import { DIAMETER, SPEED } from './config';
import styles from './my-pin.styles';

const MyPin: FC<MyPinProps> = ({ style }) => {
  const animation = useSharedValue(0);
  useEffect(() => {
    animation.value = withRepeat(
      withTiming(1, {
        duration: SPEED,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    const opacity = interpolate(animation.value, [0, 0.9, 1], [0.8, 0.3, 0], Extrapolate.CLAMP);
    const scale = interpolate(animation.value, [0, 1], [60 / DIAMETER, 1], Extrapolate.CLAMP);
    return {
      opacity: opacity,
      transform: [{ scale }],
    };
  });

  return (
    <View style={[styles.root, style]}>
      {Platform.OS === 'ios' ? (
        <View style={styles.borderPulse}>
          <Animated.View style={[styles.pulse, animatedStyles]} />
          <View style={styles.innerCircle}>
            <MyPinIcon />
          </View>
        </View>
      ) : (
        <>
          <View style={[{ position: 'absolute' }, styles.borderPulse]} />
          <Animated.View style={[styles.pulse, animatedStyles]} />
          <View style={[{ position: 'absolute' }, styles.innerCircle]} />
          <MyPinIcon />
        </>
      )}
    </View>
  );
};

type MyPinProps = ViewProps;

export default memo(MyPin);
