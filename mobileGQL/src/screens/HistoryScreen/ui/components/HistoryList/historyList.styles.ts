import { StyleSheet } from 'react-native';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingBottom: TAB_BAR_HEIGHT + 10,
  },
  text: {
    textTransform: 'uppercase',
    marginTop: 16,
    color: colors.grayscale[60],
    ...typography.subhead2_medium,
  },
});

export default styles;
