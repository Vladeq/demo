import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
  },
  title: {
    ...typography.title2_24,
    color: colors.grayscale[100],
    marginTop: 32,
    marginBottom: 16,
  },
  description: {
    ...typography.subhead3_regular,
    color: colors.grayscale[70],
    marginBottom: 40,
  },
});
export default styles;
