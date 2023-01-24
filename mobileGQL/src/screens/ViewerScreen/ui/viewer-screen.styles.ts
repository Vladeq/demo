import { StyleSheet } from 'react-native';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingBottom: TAB_BAR_HEIGHT + 22,
  },
  avatarWrapper: {
    marginTop: 24,
    marginBottom: 8,
    width: sizes.screen.width / 2 - 16 - 7.5,
    aspectRatio: 164 / 200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 24,
    backgroundColor: colors.grayscale[20],
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  editButton: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  skeletonUserName: {
    marginTop: 8,
    width: 109,
    height: 36,
    borderRadius: 18,
    alignSelf: 'center',
  },
  userName: {
    marginTop: 8,
    paddingHorizontal: 16,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.title2_24,
  },
  tagsWrapper: {
    paddingLeft: 16,
    paddingRight: 4,
    marginTop: 20,
    marginBottom: 24,
  },
  tag: {
    marginRight: 12,
  },
  divider: {
    height: 12,
    marginBottom: 12,
    backgroundColor: colors.grayscale[20],
  },
  row: {
    flexDirection: 'row',
  },
});

export default styles;
