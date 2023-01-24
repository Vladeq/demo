import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  myPin: {
    position: 'absolute',
    top: '54%',
    left: '50%',
  },
  bottomSheetStyle: {
    zIndex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  usersContainer: {
    paddingHorizontal: 8,
    marginTop: 4,
  },
  user: {
    marginHorizontal: 8,
  },
  emptyUsersContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  emptyUsersText: {
    ...typography.subhead3_regular,
    color: colors.grayscale[70],
    paddingTop: 22,
    maxWidth: 250,
    textAlign: 'center',
  },
  loader: {
    marginTop: 70,
  },
});
export default styles;
