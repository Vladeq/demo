import { StyleSheet } from 'react-native';
import { IS_PLATFORM_IOS } from 'shared/constants';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.grayscale[20],
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    color: colors.grayscale[100],
    ...typography.subhead3_regular,
    lineHeight: IS_PLATFORM_IOS ? 0 : 20,
  },
});

export default styles;
