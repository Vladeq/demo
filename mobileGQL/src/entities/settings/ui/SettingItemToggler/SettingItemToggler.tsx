import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { AppSwitch } from 'shared/ui';

import styles from './SettingItemToggler.styles';

type SettingItemTogglerProps = {
  text: string;
  isActiveSwitch: boolean;
  onToggleSwitch: () => void;
  description?: string;
  style?: ViewStyle;
};

const SettingItemToggler = ({
  text,
  isActiveSwitch,
  onToggleSwitch,
  description,
  style,
}: SettingItemTogglerProps) => {
  return (
    <View style={[styles.root, style]}>
      <View style={styles.leftBlock}>
        <Text style={styles.text}>{text}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>

      <AppSwitch isOn={isActiveSwitch} onToggle={onToggleSwitch} />
    </View>
  );
};

export default SettingItemToggler;
