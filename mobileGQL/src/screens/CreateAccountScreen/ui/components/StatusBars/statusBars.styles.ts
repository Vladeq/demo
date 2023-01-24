import { StyleSheet } from 'react-native';
import { colors, sizes } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: sizes.device.width - 16 * 2,
  },
  bar: {
    flex: 1,
    height: 4,
    borderRadius: 8,
    marginLeft: 8,
    marginTop: 20,
    backgroundColor: colors.grayscale[30],
  },
});

export default styles;
