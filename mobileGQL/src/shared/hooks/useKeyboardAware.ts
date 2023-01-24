import { useEffect, useRef, useState } from 'react';
import { Animated, Keyboard } from 'react-native';

export enum SocialLoginButtonsAnimation {
  SHOW = 1,
  HIDE = 0,
}

export const useKeyboardAware = () => {
  const [keyboardIsOpen, setKeyboardIsOpen] = useState<boolean>(false);

  const socialLoginButtons = useRef(new Animated.Value(SocialLoginButtonsAnimation.SHOW)).current;

  const formPosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const keyboardWillShow = (event: any) => {
      Animated.parallel([
        Animated.timing(socialLoginButtons, {
          toValue: SocialLoginButtonsAnimation.HIDE,
          useNativeDriver: true,
          duration: event.duration,
        }),
        Animated.timing(formPosition, {
          toValue: -event.endCoordinates.height,
          useNativeDriver: true,
          duration: event.duration + 100,
        }),
      ]).start();
    };
    const keyboardWillHide = (event: any) => {
      Animated.parallel([
        Animated.timing(socialLoginButtons, {
          toValue: SocialLoginButtonsAnimation.SHOW,
          useNativeDriver: true,
          duration: event.duration + 100,
        }),
        Animated.timing(formPosition, {
          toValue: 0,
          useNativeDriver: true,
          duration: event.duration,
        }),
      ]).start();
    };

    const keyboardDidShow = () => {
      setKeyboardIsOpen(true);
    };
    const keyboardDidHide = () => {
      setKeyboardIsOpen(false);
    };

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
  }, [socialLoginButtons, formPosition]);

  return { socialLoginButtons, formPosition, keyboardIsOpen };
};

export default useKeyboardAware;
