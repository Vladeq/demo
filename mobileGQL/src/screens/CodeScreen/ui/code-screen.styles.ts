import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  title: {
    marginTop: 25,
    marginBottom: 8,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.title2_24,
  },
  description: {
    marginBottom: 52,
    textAlign: 'center',
    color: colors.grayscale[70],
    ...typography.subhead3_regular,
  },
});

export default styles;
