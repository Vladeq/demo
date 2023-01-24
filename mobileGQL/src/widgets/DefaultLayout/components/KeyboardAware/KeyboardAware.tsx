import React, { FC } from 'react';
import { Animated, ScrollView } from 'react-native';
import { useKeyboardAware } from 'shared/hooks/useKeyboardAware';

import styles from './styles';

const KeyboardAware: FC<KeyboardAwareProps> = ({ children }) => {
  const { formPosition } = useKeyboardAware();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.root}>
      <Animated.View
        style={[
          styles.inner,
          {
            transform: [
              {
                translateY: formPosition,
              },
            ],
          },
        ]}>
        {children}
      </Animated.View>
    </ScrollView>
  );
};

interface KeyboardAwareProps {
  children: React.ReactNode;
}

export default KeyboardAware;
