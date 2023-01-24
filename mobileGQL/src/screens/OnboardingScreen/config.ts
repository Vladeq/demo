import { StepProps } from './types';

export const steps: StepProps[] = [
  {
    titleKey: 'screens.Onboarding.step1.title',
    descriptionKey: 'screens.Onboarding.step1.description',
  },
  {
    titleKey: 'screens.Onboarding.step2.title',
    descriptionKey: 'screens.Onboarding.step2.description',
  },
  {
    titleKey: 'screens.Onboarding.step3.title',
    descriptionKey: 'screens.Onboarding.step3.description',
  },
  {
    titleKey: 'screens.Onboarding.step4.title',
    descriptionKey: 'screens.Onboarding.step4.description',
  },
];

export const TOTAL_STEPS = steps.length - 1; // count from zero
