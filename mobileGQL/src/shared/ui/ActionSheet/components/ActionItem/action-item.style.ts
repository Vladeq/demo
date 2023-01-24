import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 18,
    backgroundColor: colors.alpha.white70,
  },
  text: {
    color: colors.primary.systemBlue,
    ...typography.system_title3_20Regular,
  },
});

export default styles;
