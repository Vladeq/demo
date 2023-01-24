import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  headerText: {
    color: colors.grayscale[100],
    ...typography.title4_24,
    paddingTop: 24,
    paddingBottom: 12,
  },
});

export default styles;
