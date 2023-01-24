import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grayscale[20],
  },
});

export default styles;
