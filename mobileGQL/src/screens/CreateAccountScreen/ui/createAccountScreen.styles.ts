import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.grayscale[100],
    ...typography.title2_24,
    paddingBottom: 20,
  },
  titleStep3: {
    color: colors.grayscale[100],
    ...typography.title2_24,
    marginBottom: 8,
  },
  statusBarsWrapper: {
    paddingBottom: 40,
    justifyContent: 'flex-start',
  },
});

export default styles;
