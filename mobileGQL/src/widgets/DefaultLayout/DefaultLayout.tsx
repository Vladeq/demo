import React, { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Header, KeyboardAware, KeyboardAwareScrollView } from './components';
import styles from './styles';

type DefaultLayoutProps = {
  children: React.ReactNode;
  withHorizontalPadding?: boolean;
  customStyles?: ViewStyle;
};

const DefaultLayout: FC<DefaultLayoutProps> & {
  Header: typeof Header;
  KeyboardAware: typeof KeyboardAware;
  KeyboardAwareScrollView: typeof KeyboardAwareScrollView;
} = ({ children, withHorizontalPadding = true, customStyles }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.root,
        { paddingTop: insets.top || 20, paddingBottom: insets.bottom || 20 },
        withHorizontalPadding && styles.withHorizontalPadding,
        customStyles,
      ]}>
      {children}
    </View>
  );
};

DefaultLayout.Header = Header;
DefaultLayout.KeyboardAware = KeyboardAware;
DefaultLayout.KeyboardAwareScrollView = KeyboardAwareScrollView;

export default DefaultLayout;
