import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    width: 100,
    height: 44,
    borderRadius: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: colors.white,
    ...colors.effects.shadow1,
  },
});

export default styles;
