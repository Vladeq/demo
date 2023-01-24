import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  disableScreenWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    zIndex: 1000,
  },
});

export default styles;
