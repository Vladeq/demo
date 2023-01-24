import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';

import styles from './app-text.styles';

const AppText: FC<TextProps> = ({ children, ...props }) => {
  return (
    <Text style={styles.text} allowFontScaling={false} {...props}>
      {children}
    </Text>
  );
};

export default AppText;
