import React, { ForwardedRef, forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { colors } from 'shared/styles';

import styles from './Input.styles';

type InputProps = TextInputProps & {
  hasError?: boolean;
};

const Input = forwardRef(
  ({ hasError, editable = true, ...props }: InputProps, ref: ForwardedRef<TextInput>) => {
    const textColor = hasError ? colors.additional.error : colors.grayscale[100];

    return (
      <TextInput
        editable={editable}
        selectionColor={colors.secondary.normal}
        autoCapitalize="none"
        allowFontScaling={false}
        autoCorrect={false}
        spellCheck={false}
        placeholderTextColor={colors.grayscale[60]}
        {...props}
        style={[styles.root, { color: textColor }, props.style]}
        ref={ref}
      />
    );
  },
);

export default Input;
