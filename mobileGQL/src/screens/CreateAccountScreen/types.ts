import { i18n } from 'entities';

export type StepProps = {
  titleKey: i18n.KeysTranslation;
};

export type CreateAccountForm = {
  name: string;
  tags: string[];
  imageUrl: string;
};

export type StepComponentsProps = {
  handleButtonPress: () => void;
};
