import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  codeFieldRoot: { justifyContent: 'center' },
  cell: {
    width: 44,
    height: 44,
    marginHorizontal: 12,
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.grayscale[30],
    backgroundColor: colors.grayscale[20],
    overflow: 'hidden',
    color: colors.secondary.normal,
    ...typography.subhead2_medium,
    lineHeight: 44,
  },
  errorCell: {
    color: colors.additional.error,
  },
  cursor: {
    fontSize: 18,
    lineHeight: 40,
  },
  error: {
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
    color: colors.additional.error,
    ...typography.footnote1_12Medium,
  },
});

export default styles;
