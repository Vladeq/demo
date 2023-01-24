import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    height: 44,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 1,
  },
  text: {
    color: colors.white,
    ...typography.subhead2_medium,
  },
});

export default styles;
