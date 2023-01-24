import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    ...typography.footnote2_12Regular,
  },
  errorContainer: {
    minHeight: 20,
  },
  error: {
    color: colors.additional.error,
    ...typography.footnote2_12Regular,
  },
});

export default styles;
