import { MyPin } from 'entities/map/ui';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import FirstStepUser1 from 'shared/assets/images/onboarding/FirstStepUser1.png';
import FirstStepUser2 from 'shared/assets/images/onboarding/FirstStepUser2.png';
import FirstStepUser3 from 'shared/assets/images/onboarding/FirstStepUser3.png';
import { AppText } from 'shared/ui';

import { StepProps } from '../../../types';
import styles from './step.style';

const FirstStep: FC<StepProps> = ({ titleKey, descriptionKey }) => {
  const firstAnimation = useSharedValue(0);
  const secondAnimation = useSharedValue(0);
  const thirdAnimation = useSharedValue(0);
  const { t } = useTranslation();

  useEffect(() => {
    firstAnimation.value = withRepeat(
      withTiming(1, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    secondAnimation.value = withRepeat(
      withTiming(1, {
        duration: 4000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    thirdAnimation.value = withRepeat(
      withTiming(1, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedFirstStyles = useAnimatedStyle(() => {
    const translateX = withSpring(firstAnimation.value * -25, { damping: 20, stiffness: 80 });
    const translateY = withSpring(firstAnimation.value * 10);
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  const animatedSecondStyles = useAnimatedStyle(() => {
    const translateX = withSpring(secondAnimation.value * 25, { damping: 20, stiffness: 80 });
    const translateY = withSpring(secondAnimation.value * 10);
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  const animatedThirdStyles = useAnimatedStyle(() => {
    const translateX = withSpring(thirdAnimation.value * 10, { damping: 20, stiffness: 80 });
    const translateY = withSpring(thirdAnimation.value * 20);
    return {
      transform: [{ translateX }, { translateY }],
    };
  });
  return (
    <View>
      <View style={styles.imageWrapper}>
        <View style={styles.contentContainer}>
          <Animated.Image source={FirstStepUser1} style={[styles.firstImage, animatedFirstStyles]} />
          <Animated.Image source={FirstStepUser2} style={[styles.secondImage, animatedSecondStyles]} />
          <Animated.Image source={FirstStepUser3} style={[styles.thirdImage, animatedThirdStyles]} />
          <MyPin style={styles.pin} />
        </View>
      </View>
      <AppText style={styles.title}>{t(titleKey) as string}</AppText>
      <AppText style={styles.description}>{t(descriptionKey) as string}</AppText>
    </View>
  );
};

export default FirstStep;
