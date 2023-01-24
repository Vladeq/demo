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
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 16,
  },
  withIconText: {
    ...typography.body3_regular,
    color: colors.grayscale[100],
  },
  text: {
    ...typography.body2_medium,
    color: colors.grayscale[100],
  },
});

export default styles;
