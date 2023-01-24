import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 40,
    marginTop: 10,
  },
  leftButton: {
    position: 'absolute',
    left: 0,
    width: 40,
    height: 40,
  },
  rightButton: {
    position: 'absolute',
    right: 0,
  },
  title: {
    paddingHorizontal: 45,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.headline1_18,
  },
});

export default styles;
