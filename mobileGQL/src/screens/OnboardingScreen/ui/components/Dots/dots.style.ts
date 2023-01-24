import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
    backgroundColor: colors.grayscale[30],
  },
  dotActive: {
    width: 16,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 2,
  },
});

export default styles;
