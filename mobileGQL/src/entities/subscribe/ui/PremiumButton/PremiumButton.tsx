import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageBackground, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import PremiumBackground from 'shared/assets/images/premium-background.png';

import styles from './premium-button.styles';

const PremiumButton: FC<TouchableOpacityProps> = ({ onPress }) => {
  const { t } = useTranslation();
  return (
    <View>
      <TouchableOpacity style={styles.root} onPress={onPress} activeOpacity={0.5}>
        <Text style={styles.title}>{t('entities.premiumButton.title')}</Text>
        <Text style={styles.text}>{t('entities.premiumButton.description')}</Text>
      </TouchableOpacity>

      <View style={styles.absoluteContainer}>
        <ImageBackground source={PremiumBackground} resizeMode="contain" style={styles.image} />
      </View>
    </View>
  );
};

export default PremiumButton;
