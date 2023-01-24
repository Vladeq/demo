import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: colors.grayscale[20],
  },
  text: {
    color: colors.secondary.normal,
    ...typography.subhead2_medium,
  },
});

export default styles;
