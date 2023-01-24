import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  pagerView: {
    flexGrow: 1,
    minHeight: 482,
  },
  slide: {
    flex: 1,
  },
  skip: {
    color: colors.grayscale[70],
    ...typography.body3_regular,
  },
  dotsWrapper: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
});

export default styles;
