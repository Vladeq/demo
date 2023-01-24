import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  button: {
    color: colors.secondary.normal,
    ...typography.subhead2_medium,
  },
  buttonDisabled: {
    color: colors.grayscale[60],
  },
  timer: {
    marginTop: 12,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.subhead2_medium,
  },
});

export default styles;
