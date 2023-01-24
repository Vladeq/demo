import React, { ForwardedRef, forwardRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import Input from '../Input';
import styles from './TextField.styles';

type TextFieldProps = TextInputProps & {
  label?: string;
  error?: string;
  isLoading?: boolean;
};

const TextField = forwardRef(
  (
    { label, error, isLoading, style, value, onChangeText, editable, ...props }: TextFieldProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    return (
      <View style={style}>
        {label && <Text style={styles.label}>{label}</Text>}

        <Input
          {...props}
          value={value}
          onChangeText={onChangeText}
          editable={editable || !isLoading}
          hasError={Boolean(error)}
          ref={ref}
        />

        <View style={styles.errorContainer}>{error && <Text style={styles.error}>{error}</Text>}</View>
      </View>
    );
  },
);

export default TextField;
