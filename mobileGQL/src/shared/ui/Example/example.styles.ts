import { StyleSheet } from 'react-native';
import { sizes, typography } from 'shared/styles';
import colors from 'shared/styles/themes/light';

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: sizes.screen.height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  shadow: {
    width: 200,
    height: 200,
    ...colors.effects.shadow1,
    backgroundColor: '#fff',
  },
  typography: {
    marginBottom: 20,
    ...typography.title3_20,
  },
  link: {
    color: colors.secondary.normal,
  },
});

export default styles;
