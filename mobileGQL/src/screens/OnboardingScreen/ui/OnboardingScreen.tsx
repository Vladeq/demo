import { OnboardingScreenProps } from 'processes/navigation/main-stack/MainStackNavigator';
import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { AppButton, AppText } from 'shared/ui';
import { DefaultLayout } from 'widgets';

import { TOTAL_STEPS, steps } from '../config';
import { handleSkip, usePagerView } from '../models';
import { Dots, FirstStep, FourthStep, SecondStep, ThirdStep } from './components';
import styles from './onboarding-screen.style';

const OnboardingScreen: FC<OnboardingScreenProps> = () => {
  const { t } = useTranslation();
  const { currentStep, handleNextPage, handlePrevPage, pagerViewRef, onPageSelected } = usePagerView();

  const renderStep = useCallback(
    (step: any) => {
      switch (currentStep) {
        case 0:
          return <FirstStep {...step} />;
        case 1:
          return <SecondStep {...step} />;
        case 2:
          return <ThirdStep {...step} />;
        case 3:
          return <FourthStep {...step} />;
        default:
          return null;
      }
    },
    [currentStep],
  );

  return (
    <DefaultLayout>
      <DefaultLayout.Header
        defaultBack={currentStep !== 0}
        onBackButtonPress={handlePrevPage}
        customRight={
          <AppText style={styles.skip} onPress={handleSkip}>
            Skip
          </AppText>
        }
      />
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        ref={pagerViewRef}
        scrollEnabled={false}
        onPageSelected={onPageSelected}>
        {useMemo(
          () =>
            steps.map((step, index) => (
              <View key={index} style={styles.slide}>
                {renderStep(step)}
              </View>
            )),
          [renderStep],
        )}
      </PagerView>
      <View style={styles.dotsWrapper}>
        <Dots activeSlide={currentStep} />
      </View>
      <AppButton.SimpleButton onPress={currentStep !== TOTAL_STEPS ? handleNextPage : handleSkip}>
        {t(currentStep !== TOTAL_STEPS ? 'screens.Onboarding.next' : 'screens.Onboarding.getStarted')}
      </AppButton.SimpleButton>
    </DefaultLayout>
  );
};

export default OnboardingScreen;
