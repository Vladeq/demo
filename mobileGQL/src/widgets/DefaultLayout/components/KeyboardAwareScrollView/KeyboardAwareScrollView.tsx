import React, { FC } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView as KeyboardAwareScrollViewUI } from 'react-native-keyboard-aware-scroll-view';
import { useKeyboardAwareScrollView } from 'shared/hooks/useKeyboardAwareScrollView';

type KeyboardAwareScrollViewProps = {
  children: React.ReactNode;
};

const KeyboardAwareScrollView: FC<KeyboardAwareScrollViewProps> = ({ children }) => {
  const { height } = useKeyboardAwareScrollView();
  const isIos = Platform.OS === 'ios';

  return (
    <KeyboardAwareScrollViewUI
      contentContainerStyle={isIos ? { minHeight: height } : { flex: 1 }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'none'}
      nestedScrollEnabled
      enableOnAndroid>
      {children}
    </KeyboardAwareScrollViewUI>
  );
};

export default KeyboardAwareScrollView;
