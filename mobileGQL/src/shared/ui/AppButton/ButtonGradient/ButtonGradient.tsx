import React, { FC, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'shared/styles';

import styles from './ButtonGradient.styles';

type ButtonGradientProps = TouchableOpacityProps & {
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const ButtonGradient: FC<ButtonGradientProps> = ({
  onPress,
  children,
  isDisabled = false,
  isLoading = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);

  const backgroundColorStyle = useMemo(() => {
    if (isDisabled) {
      return [colors.primary.light, colors.primary.light];
    } else if (isActive) {
      return [colors.primary.normal, colors.primary.normal];
    }
    return [colors.primary.gradient1, colors.primary.gradient2];
  }, [isDisabled, isActive]);

  return (
    <TouchableOpacity
      disabled={isDisabled || isLoading}
      onPress={onPress}
      style={props.style}
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      activeOpacity={1}>
      <LinearGradient
        colors={backgroundColorStyle}
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.root}>
        {isLoading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.text} numberOfLines={1} allowFontScaling={false}>
            {children}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ButtonGradient;
