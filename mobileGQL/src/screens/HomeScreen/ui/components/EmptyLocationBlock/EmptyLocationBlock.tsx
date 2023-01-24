import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Text, View } from 'react-native';
import { LocationEmpty } from 'shared/assets/svgs';
import { AppButton } from 'shared/ui';

import styles from './empty-location-block.style';

type EmptyLocationBlockProps = {
  onPress: () => void;
};

const EmptyLocationBlock: FC<EmptyLocationBlockProps> = ({ onPress }) => {
  // @ts-ignore
  const { t } = useTranslation('translation', {
    keyPrefix: 'screens.Home.EmptyLocationBlock',
  });

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <LocationEmpty />
        <Text style={styles.title}>{t('title')}</Text>
        <Text style={styles.description}>{t('description')}</Text>
      </View>
      <AppButton.SimpleButton onPress={onPress} variant="secondary">
        {t('button')}
      </AppButton.SimpleButton>
    </View>
  );
};

export default EmptyLocationBlock;
