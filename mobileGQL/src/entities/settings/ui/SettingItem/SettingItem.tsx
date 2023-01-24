import React, { FC } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { ArrowIcon } from 'shared/assets/svgs';
import { colors } from 'shared/styles';

import styles from './SettingItem.styles';

type SettingItemProps = TouchableOpacityProps & {
  onPress: () => void;
  text: string;
  IconComponent?: FC<SvgProps>;
  iconColor?: string;
};

const SettingItem = ({ text, IconComponent, onPress, iconColor, ...props }: SettingItemProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.root, props.style]} onPress={onPress} activeOpacity={0.5}>
      <View style={styles.leftBlock}>
        {IconComponent && (
          <View style={styles.icon}>
            <IconComponent fill={iconColor || colors.grayscale[90]} />
          </View>
        )}
        <Text style={IconComponent ? styles.withIconText : styles.text}>{text}</Text>
      </View>
      <View style={{ transform: [{ rotate: '180deg' }] }}>
        <ArrowIcon stroke={colors.grayscale[40]} />
      </View>
    </TouchableOpacity>
  );
};

export default SettingItem;
