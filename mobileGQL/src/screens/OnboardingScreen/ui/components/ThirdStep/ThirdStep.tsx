import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ThirdStepBooks from 'shared/assets/images/onboarding/ThirdStepBooks.png';
import ThirdStepCat from 'shared/assets/images/onboarding/ThirdStepCat.png';
import ThirdStepCircle from 'shared/assets/images/onboarding/ThirdStepCircle.png';
import ThirdStepCofee from 'shared/assets/images/onboarding/ThirdStepCofee.png';
import ThirdStepMainImage from 'shared/assets/images/onboarding/ThirdStepMainImage.png';
import ThirdStepPhoto from 'shared/assets/images/onboarding/ThirdStepPhoto.png';
import ThirdStepPlus from 'shared/assets/images/onboarding/ThirdStepPlus.png';
import { AppText } from 'shared/ui';

import { StepProps } from '../../../types';
import styles from './step.style';

const ThirdStep: FC<StepProps> = ({ titleKey, descriptionKey }) => {
  const firstAnimation = useSharedValue(0);
  const secondAnimation = useSharedValue(0);
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
    const translateX = withSpring(firstAnimation.value * -10, { damping: 20, stiffness: 80 });
    const translateY = withSpring(firstAnimation.value * 10);
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  const animatedFourthStyles = useAnimatedStyle(() => {
    const translateX = withSpring(secondAnimation.value * 30, { damping: 20, stiffness: 80 });
    const translateY = withSpring(secondAnimation.value * -10);
    return {
      transform: [{ translateX }, { translateY }],
    };
  });

  return (
    <View>
      <View style={styles.imageWrapper}>
        <View style={styles.contentContainer}>
          <Animated.Image source={ThirdStepPhoto} style={[styles.firstImage, animatedFirstStyles]} />
          <Animated.Image source={ThirdStepCofee} style={[styles.secondImage, animatedSecondStyles]} />
          <Animated.Image source={ThirdStepBooks} style={[styles.thirdImage, animatedThirdStyles]} />
          <Animated.Image source={ThirdStepCat} style={[styles.fourthImage, animatedFourthStyles]} />
          <Animated.Image source={ThirdStepCircle} style={[styles.fifthImage, animatedThirdStyles]} />
          <Animated.Image source={ThirdStepPlus} style={[styles.sixImage, animatedFourthStyles]} />
          <Image source={ThirdStepMainImage} style={styles.mainImage} />
        </View>
      </View>
      <AppText style={styles.title}>{t(titleKey) as string}</AppText>
      <AppText style={styles.description}>{t(descriptionKey) as string}</AppText>
    </View>
  );
};

export default ThirdStep;
