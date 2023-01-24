import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export const DEFAULT_SCREEN_OPTIONS = {
  headerShown: false,
  animation: 'slide_from_right',
  orientation: 'portrait_up',
} as NativeStackNavigationOptions;

export const MODAL_SCREEN_OPTIONS = {
  headerShown: false,
  animation: 'slide_from_bottom',
  orientation: 'portrait_up',
  headerLeft: () => null,
  gestureEnabled: false,
} as NativeStackNavigationOptions;
