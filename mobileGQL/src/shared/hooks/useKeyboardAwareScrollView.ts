import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { sizes } from 'shared/styles';

export const useKeyboardAwareScrollView = () => {
  const insets = useSafeAreaInsets();
  const fullScreenHeight = sizes.device.height - insets.bottom - insets.top;
  const [height, setHeight] = useState<number>(fullScreenHeight);

  useEffect(() => {
    const keyboardWillShow = (event: KeyboardEvent) => {
      setHeight(fullScreenHeight - event.endCoordinates.height);
    };
    const keyboardWillHide = () => {
      setHeight(fullScreenHeight);
    };

    const keyboardDidShow = () => {};
    const keyboardDidHide = () => {};

    let keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    let keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);

    let keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    let keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fullScreenHeight]);

  return { height };
};

export default useKeyboardAwareScrollView;
