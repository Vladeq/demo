import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  optionText: {
    ...typography.subhead3_regular,
    marginBottom: 12,
  },
  optionLine: {
    height: 1,
    backgroundColor: colors.grayscale[20],
  },
});

export default styles;
