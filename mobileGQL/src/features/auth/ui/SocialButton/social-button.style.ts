import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: colors.primary.lighter,
    borderWidth: 1,
    borderColor: colors.grayscale[0],
    borderRadius: 40,
  },
  text: {
    color: colors.grayscale[100],
    ...typography.subhead2_medium,
  },
  icon: {
    position: 'absolute',
    top: '50%',
    left: 16,
  },
});

export default styles;
