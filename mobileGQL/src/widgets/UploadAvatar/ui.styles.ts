import { StyleSheet } from 'react-native';
import { colors, sizes } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    borderRadius: 24,
    backgroundColor: colors.grayscale[20],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    width: sizes.screen.width / 2 - 16 - 7.5,
    borderStyle: 'dashed',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  removeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: -8,
    right: -8,
    ...colors.effects.shadow1,
  },
});

export default styles;
