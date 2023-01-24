import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { ToastProvider as DefaultToastProvider } from 'react-native-toast-notifications';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';
import { colors } from 'shared/styles';

import styles from './ui.style';

const CustomToast = ({ message, type }: ToastProps) => {
  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: type === 'error' ? colors.additional.error : colors.grayscale[40],
        },
      ]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider: FC<ToastProviderProps> = (props) => {
  return (
    <DefaultToastProvider
      placement="bottom"
      duration={5000}
      offsetBottom={100}
      animationDuration={250}
      swipeEnabled={true}
      renderToast={CustomToast}
      {...props}>
      {props.children}
    </DefaultToastProvider>
  );
};

export default ToastProvider;
