import { StyleSheet } from 'react-native';
import { typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    height: 44,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.subhead2_medium,
  },
});

export default styles;
