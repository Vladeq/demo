import { StyleSheet } from 'react-native';
import { TAB_BAR_BORDER_RADIUS } from 'shared/constants';

import sizes from '../sizes';
import colors from '../themes';

const globalStyle = StyleSheet.create({
  tabBarShadow: {
    position: 'absolute',
    bottom: 0,
    width: sizes.screen.width,
    backgroundColor: colors.grayscale[0],
    borderTopLeftRadius: TAB_BAR_BORDER_RADIUS,
    borderTopRightRadius: TAB_BAR_BORDER_RADIUS,
    ...colors.effects.shadowTop,
    elevation: 20,
  },
});

export default globalStyle;
