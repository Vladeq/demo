import React, { FC } from 'react';
import { ActivityIndicator, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { colors } from 'shared/styles';
import { AppText } from 'shared/ui';

import styles from './social-button.style';

type ButtonProps = {
  text: string;
  Icon: (props: SvgProps) => JSX.Element;
  onPress: () => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button: FC<ButtonProps> = ({ text, Icon, onPress, isLoading, style }) => {
  return (
    <>
      <TouchableOpacity style={[styles.button, style]} activeOpacity={0.9} onPress={onPress}>
        {isLoading ? (
          <ActivityIndicator color={colors.grayscale[100]} />
        ) : (
          <AppText style={styles.text}>{text}</AppText>
        )}

        <Icon style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

export default Button;
