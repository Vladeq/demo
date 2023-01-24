import { StyleSheet } from 'react-native';
import { colors, sizes } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    borderRadius: 24,
    backgroundColor: colors.grayscale[20],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
    width: sizes.screen.width / 2 - 16 - 7.5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  likeButton: {
    position: 'absolute',
    width: 40,
    height: 40,
    top: 0,
    right: 0,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: -28,
  },
  initiateButton: {
    width: 116,
  },
});

export default styles;
