import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    height: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftBlock: {
    flexDirection: 'column',
  },
  text: {
    ...typography.body2_medium,
    color: colors.grayscale[100],
  },
  description: {
    ...typography.footnote2_12Regular,
    color: colors.grayscale[70],
  },
});

export default styles;
