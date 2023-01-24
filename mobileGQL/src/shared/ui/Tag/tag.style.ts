import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 24,
    backgroundColor: colors.primary.lighter,
    borderColor: colors.primary.lighter,
    borderWidth: 1,
  },
  activeRoot: {
    borderColor: colors.primary.border,
  },
  inactiveRoot: {
    backgroundColor: colors.grayscale[20],
    borderColor: colors.grayscale[20],
  },
  text: {
    color: colors.grayscale[100],
    ...typography.subhead3_regular,
  },
});

export default styles;
