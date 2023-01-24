import { StyleSheet } from 'react-native';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: sizes.screen.width,
    height: TAB_BAR_HEIGHT,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.grayscale[0],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  button: {
    alignItems: 'center',
  },
  iconWrapper: {},
  badgeWrapper: {
    position: 'absolute',
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.additional.red,
    right: 2,
    top: 2,
  },
  label: {
    color: colors.grayscale[40],
    ...typography.footnote4_10Regular,
  },
  labelActive: {
    color: colors.secondary.normal,
    ...typography.footnote3_10SemiBold,
  },
});

export default styles;
