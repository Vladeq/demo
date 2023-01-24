import React, { FC, useEffect, useRef } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { colors } from 'shared/styles';

import styles from './phone-field.style';

type PhoneFieldProps = TextInputProps & {
  phoneLength: number;
  label?: string;
  error?: string;
  isLoading?: boolean;
};

const PhoneField: FC<PhoneFieldProps> = ({
  phoneLength,
  label,
  error,
  isLoading,
  style,
  value,
  onChangeText,
  ...props
}) => {
  // for auto-close keyboard after all numbers of phone filled
  const inputRef = useRef<TextInput | null>(null);

  const _onChange = (formatted: string) => {
    const plainPhone = formatted.replace(/\D+/g, '');
    onChangeText && onChangeText(plainPhone);
  };

  // for auto-close keyboard after all numbers of phone filled
  useEffect(() => {
    value && value?.length >= phoneLength && inputRef.current?.blur();
  }, [value, phoneLength]);

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInputMask
        {...props}
        type="custom"
        keyboardType="numeric"
        options={{
          mask: '+9 (999) 999 99 99',
        }}
        style={[styles.input, Boolean(error) && styles.errorInput]}
        placeholder="+0 (000) 000-00-00"
        placeholderTextColor={colors.grayscale[70]}
        value={value}
        onChangeText={_onChange}
        editable={!isLoading}
        refInput={(ref) => (inputRef.current = ref)}
      />

      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

export default PhoneField;
