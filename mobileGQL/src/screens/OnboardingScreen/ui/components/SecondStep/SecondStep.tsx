import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import SecondStepButton from 'shared/assets/images/onboarding/SecondStepButton.png';
import SecondStepUser1 from 'shared/assets/images/onboarding/SecondStepUser1.png';
import SecondStepUser2 from 'shared/assets/images/onboarding/SecondStepUser2.png';
import { AppText } from 'shared/ui';

import { StepProps } from '../../../types';
import styles from './step.style';

const SecondStep: FC<StepProps> = ({ titleKey, descriptionKey }) => {
  const animation = useSharedValue(1);
  const { t } = useTranslation();

  useEffect(() => {
    animation.value = withTiming(0, {
      duration: 1000,
      easing: Easing.linear,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedFirstStyles = useAnimatedStyle(() => {
    const opacity = interpolate(animation.value, [0, 0.9, 1], [1, 0.8, 0.4], Extrapolate.CLAMP);
    const translateX = withSpring(animation.value * -50);
    return { opacity, transform: [{ translateX }] };
  });

  const animatedSecondStyles = useAnimatedStyle(() => {
    const opacity = interpolate(animation.value, [0, 0.9, 1], [1, 0.8, 0.4], Extrapolate.CLAMP);

    const translateX = withSpring(animation.value * 50);
    return {
      opacity,
      transform: [{ translateX }],
    };
  });

  return (
    <View>
      <View style={styles.imageWrapper}>
        <View style={styles.contentContainer}>
          <Animated.Image
            source={SecondStepUser1}
            style={[styles.firstImage, animatedFirstStyles]}
            resizeMode="cover"
          />
          <Animated.Image
            source={SecondStepUser2}
            style={[styles.secondImage, animatedSecondStyles]}
            resizeMode="cover"
          />
        </View>
        <Animated.Image source={SecondStepButton} style={[styles.thirdImage]} resizeMode="cover" />
      </View>
      <AppText style={styles.title}>{t(titleKey) as string}</AppText>
      <AppText style={styles.description}>{t(descriptionKey) as string}</AppText>
    </View>
  );
};

export default SecondStep;
