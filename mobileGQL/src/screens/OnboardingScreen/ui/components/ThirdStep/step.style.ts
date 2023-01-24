import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 320,
    marginTop: sizes.screen.height > 700 ? 60 : 0,
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
    width: 48,
    height: 48,
    position: 'absolute',
    top: 210,
    right: 20,
  },
  secondImage: {
    width: 52,
    height: 52,
    position: 'absolute',
    top: 30,
    right: 20,
    zIndex: 5,
  },
  thirdImage: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: -20,
    left: 10,
    zIndex: 5,
  },
  fourthImage: {
    width: 48,
    height: 48,
    position: 'absolute',
    top: 140,
    left: -20,
    zIndex: 5,
  },
  fifthImage: {
    width: 22,
    height: 22,
    position: 'absolute',
    bottom: 0,
    left: 40,
    zIndex: 5,
  },
  sixImage: {
    width: 15,
    height: 15,
    position: 'absolute',
    top: -40,
    right: 0,
    zIndex: 5,
  },
  mainImage: {
    width: 220,
    height: 260,
  },
});

export default styles;
