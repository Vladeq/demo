import React, { ForwardedRef, forwardRef, useState } from 'react';
import { LayoutRectangle, Platform, TextInput, TextInputProps, View } from 'react-native';
import { SearchIcon } from 'shared/assets/svgs';
import colors from 'shared/styles/themes/light';

import Input from '../Input';
import { OptionsList } from './components';
import styles from './SearchField.styles';

export type SearchFieldVariant = 'primary' | 'secondary';

type SearchFieldProps = TextInputProps & {
  variant?: SearchFieldVariant;
  options: { id: number; text: string }[];
};

const SearchField = forwardRef(
  (
    { variant = 'primary', style, options, value, onChangeText, editable, ...props }: SearchFieldProps,
    ref: ForwardedRef<TextInput>,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [inputRectangle, setInputRectangle] = useState<LayoutRectangle | null>(null);

    const backgroundColorField = variant === 'primary' ? colors.white : colors.grayscale[20];

    const INPUT_MARGIN_BOTTOM = 8;
    const IOS_POSITION_ERROR_RATE = 25;

    const dropdownPosition =
      inputRectangle &&
      (Platform.OS === 'ios' ? inputRectangle.height + IOS_POSITION_ERROR_RATE : inputRectangle.height) +
        inputRectangle.y +
        INPUT_MARGIN_BOTTOM;

    const onSelectOption = (text: string) => {
      onChangeText!(text);
      setIsFocused(false);
    };

    const handleChangeText = (text: string) => {
      onChangeText!(text);
      setIsFocused(true);
    };

    return (
      <View style={[styles.root, style]} onLayout={(e) => setInputRectangle(e.nativeEvent.layout)}>
        <View style={styles.iconContainer}>
          <SearchIcon />
        </View>
        <Input
          {...props}
          value={value}
          onChangeText={handleChangeText}
          editable={editable}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          style={[
            styles.input,
            {
              backgroundColor: backgroundColorField,
            },
            variant === 'primary' && colors.effects.shadow1,
          ]}
        />

        <OptionsList
          dropdownPosition={dropdownPosition}
          isVisible={Boolean(value) && isFocused}
          options={options}
          onPress={onSelectOption}
          onClose={() => setIsFocused(false)}
        />
      </View>
    );
  },
);

export default SearchField;
