import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    transform: [{ translateY: -10 }],
  },
  message: {
    color: colors.white,
    ...typography.subhead1_bold,
  },
});

export default styles;
