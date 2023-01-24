import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    height: 84,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary.normal,
    zIndex: 1,
    width: sizes.device.width - 16 * 2,
  },
  title: {
    ...typography.title3_20,
    color: colors.grayscale[100],
    marginBottom: 4,
  },
  text: {
    ...typography.subhead3_regular,
    color: colors.grayscale[100],
  },
  absoluteContainer: {
    position: 'absolute',
    width: '100%',
    height: 84,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  image: {
    width: 260,
  },
});

export default styles;
