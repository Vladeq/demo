import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import styles from './OptionItem.styles';

type OptionItemProps = {
  text: string;
  onPress: () => void;
};

const OptionItem = ({ onPress, text }: OptionItemProps) => (
  <View style={styles.root}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.optionText}>{text}</Text>
    </TouchableOpacity>
    <View style={styles.optionLine} />
  </View>
);

export default OptionItem;
