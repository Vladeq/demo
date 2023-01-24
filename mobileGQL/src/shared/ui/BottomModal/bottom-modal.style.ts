import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  root: {
    paddingHorizontal: 16,
    paddingTop: 24,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    backgroundColor: colors.grayscale[0],
  },
});

export default styles;
