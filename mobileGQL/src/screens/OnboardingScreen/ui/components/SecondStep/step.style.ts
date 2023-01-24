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
    width: 343,
    height: 240,
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
  firstImage: {
    width: 190,
    height: 230,
    position: 'absolute',
    top: 30,
    right: '42%',
    zIndex: 5,
  },
  secondImage: {
    width: 170,
    height: 200,
    position: 'absolute',
    top: 40,
    left: '42%',
    zIndex: 4,
  },
  thirdImage: {
    width: 140,
    height: 70,
    marginTop: 17,
    marginBottom: 40,
  },
});

export default styles;
