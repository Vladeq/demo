import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  inner: {},
  info: {
    color: colors.grayscale[70],
    ...typography.subhead3_regular,
    marginBottom: 24,
  },
  infoError: {
    color: colors.additional.error,
    ...typography.subhead3_regular,
    marginBottom: 24,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginHorizontal: 5,
    marginVertical: 5,
  },
});

export default styles;
