import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

export default StyleSheet.create({
  root: {
    backgroundColor: colors.grayscale[0],
    flex: 1,
  },
  withHorizontalPadding: {
    paddingHorizontal: 16,
  },
});
