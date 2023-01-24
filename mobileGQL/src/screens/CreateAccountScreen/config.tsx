import { StepProps } from './types';

export const steps: StepProps[] = [
  {
    titleKey: 'screens.CreateAccount.step1.title',
  },
  {
    titleKey: 'screens.CreateAccount.step2.title',
  },
  {
    titleKey: 'screens.CreateAccount.step3.title',
  },
  {
    titleKey: 'screens.CreateAccount.step4.title',
  },
];

export const TOTAL_STEPS = steps.length - 1;
export const MIN_NAME_LENGTH = 2;
export const MAX_NAME_LENGTH = 20;
export const TAGS = [
  { id: 'Photography', title: 'Photography' },
  { id: 'Music', title: 'Music' },
  { id: 'Travel', title: 'Travel' },
  { id: 'Movie', title: 'Movie' },
  { id: 'Dance', title: 'Dance' },
  { id: 'Books', title: 'Books' },
  { id: 'Comedy', title: 'Comedy' },
  { id: 'Pets', title: 'Pets' },
  { id: 'Sport', title: 'Sport' },
  { id: 'Games', title: 'Games' },
  { id: 'Blogging', title: 'Blogging' },
  { id: 'Social Media', title: 'Social Media' },
];
