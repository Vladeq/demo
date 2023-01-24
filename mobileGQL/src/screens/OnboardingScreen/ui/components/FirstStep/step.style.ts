import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 320,
    marginVertical: sizes.screen.height > 700 ? 60 : 0,
  },
  contentContainer: {
    width: 250,
    height: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: 16,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.title2_24,
  },
  description: {
    color: colors.grayscale[70],
    textAlign: 'center',
    ...typography.subhead3_regular,
  },
  pin: {
    position: 'relative',
    top: 0,
    left: 0,
    width: 236,
    height: 236,
  },
  firstImage: {
    width: 36,
    height: 36,
    position: 'absolute',
    top: 215,
    right: 20,
    zIndex: 5,
  },
  secondImage: {
    width: 44,
    height: 44,
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 5,
  },
  thirdImage: {
    width: 39,
    height: 39,
    position: 'absolute',
    top: 136,
    left: -30,
    zIndex: 5,
  },
});

export default styles;
