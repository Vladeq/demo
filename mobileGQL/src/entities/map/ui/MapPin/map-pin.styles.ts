import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  zone: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 41,
    backgroundColor: colors.alpha.gray7,
  },
  imageWrapper: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.grayscale[0],
    borderRadius: 21,
    backgroundColor: colors.alpha.gray7,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 21,
  },
});

export default styles;
