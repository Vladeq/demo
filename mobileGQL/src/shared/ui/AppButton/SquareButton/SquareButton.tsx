import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import styles from './SquareButton.styles';

type SquareButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  Icon: FC<SvgProps>;
};

const SquareButton = ({ onPress, Icon, ...props }: SquareButtonProps) => {
  return (
    <TouchableOpacity {...props} style={[styles.root, props.style]} onPress={onPress} activeOpacity={0.6}>
      <Icon />
    </TouchableOpacity>
  );
};

export default SquareButton;
