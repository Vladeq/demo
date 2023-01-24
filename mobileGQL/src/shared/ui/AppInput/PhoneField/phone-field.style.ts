import { StyleSheet } from 'react-native';
import { IS_PLATFORM_IOS } from 'shared/constants';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    color: colors.grayscale[0],
    ...typography.footnote2_12Regular,
  },
  input: {
    backgroundColor: colors.grayscale[20],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    color: colors.grayscale[100],
    ...typography.subhead3_regular,
    lineHeight: IS_PLATFORM_IOS ? 0 : 20,
  },
  errorInput: {
    color: colors.additional.error,
  },
  error: {
    marginTop: 2,
    marginBottom: 4,
    color: colors.grayscale[0],
    ...typography.footnote2_12Regular,
  },
});

export default styles;
