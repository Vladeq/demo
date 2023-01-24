import React, { FC, useMemo } from 'react';
import { ActivityIndicator, Text, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { colors } from 'shared/styles';

import styles from './SimpleButton.styles';

type SimpleButtonVariant = 'secondary' | 'delete' | 'text';

type SimpleButtonProps = TouchableHighlightProps & {
  onPress: () => void;
  variant?: SimpleButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const SimpleButton: FC<SimpleButtonProps> = ({
  onPress,
  children,
  variant = 'secondary',
  isDisabled = false,
  isLoading = false,
  ...props
}) => {
  const backgroundColor = useMemo(() => {
    switch (variant) {
      case 'secondary':
        if (isDisabled) {
          return colors.grayscale[30];
        }
        return colors.secondary.normal;
      case 'delete':
        if (isDisabled) {
          return colors.primary.light;
        }
        return colors.additional.error;
      case 'text':
        return 'transparent';
    }
  }, [variant, isDisabled]);

  const activeBackgroundColor = useMemo(() => {
    switch (variant) {
      case 'secondary':
        return colors.secondary.active;
      case 'delete':
        return colors.additional.red1;
      case 'text':
        return 'transparent';
    }
  }, [variant]);

  const textVariantColor = useMemo(
    () => (variant === 'text' ? (isDisabled ? colors.grayscale[40] : colors.grayscale[100]) : colors.white),
    [variant, isDisabled],
  );

  return (
    <TouchableHighlight
      {...props}
      style={[styles.root, { backgroundColor }, props.style]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      underlayColor={activeBackgroundColor}
      activeOpacity={variant === 'delete' ? 1 : 0.5}>
      {isLoading ? (
        <ActivityIndicator color={textVariantColor} />
      ) : (
        <Text style={[styles.text, { color: textVariantColor }]} numberOfLines={1} allowFontScaling={false}>
          {children}
        </Text>
      )}
    </TouchableHighlight>
  );
};

export default SimpleButton;
