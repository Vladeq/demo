import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  inner: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    color: colors.grayscale[100],
    ...typography.title2_24,
    marginTop: 32,
  },
  info: {
    color: colors.grayscale[70],
    ...typography.subhead3_regular,
    marginBottom: 16,
  },
});

export default styles;
