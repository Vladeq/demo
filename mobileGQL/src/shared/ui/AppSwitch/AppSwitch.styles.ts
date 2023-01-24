import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 28,
    padding: 0,
  },
  thumb: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  activeThumb: {
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
});

export default styles;
