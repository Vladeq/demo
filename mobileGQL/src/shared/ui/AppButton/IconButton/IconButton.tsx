import React, { FC, useMemo } from 'react';
import { ActivityIndicator, TouchableHighlight, TouchableHighlightProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { colors } from 'shared/styles';

import styles from './IconButton.styles';

export type IconButtonVariant = 'primary' | 'secondary';

type IconButtonProps = TouchableHighlightProps & {
  onPress?: () => void;
  Icon: FC<SvgProps>;
  variant?: IconButtonVariant;
  isLoading?: boolean;
  isDisabled?: boolean;
};

const IconButton: FC<IconButtonProps> = ({
  onPress,
  Icon,
  variant = 'primary',
  isDisabled = false,
  isLoading = false,
  ...props
}) => {
  const backgroundColor = useMemo(() => {
    switch (variant) {
      case 'primary':
        if (isDisabled) {
          return colors.grayscale[40];
        }
        return colors.secondary.normal;
      case 'secondary':
        if (isDisabled) {
          return colors.grayscale[40];
        }
        return colors.white;
    }
  }, [variant, isDisabled]);

  const activeBackgroundColor = useMemo(() => {
    switch (variant) {
      case 'primary':
        return colors.secondary.active;
      case 'secondary':
        return colors.white;
    }
  }, [variant]);

  const iconVariantColor = useMemo(() => {
    switch (variant) {
      case 'primary':
        return colors.white;
      case 'secondary':
        if (isDisabled) {
          return colors.white;
        }
        return colors.additional.error;
    }
  }, [variant, isDisabled]);

  return (
    <TouchableHighlight
      {...props}
      style={[styles.root, { backgroundColor: backgroundColor }, props.style]}
      onPress={onPress}
      disabled={isDisabled || isLoading}
      underlayColor={activeBackgroundColor}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator color={iconVariantColor} />
      ) : (
        <Icon width={18} height={18} fill={iconVariantColor} />
      )}
    </TouchableHighlight>
  );
};

export default IconButton;
