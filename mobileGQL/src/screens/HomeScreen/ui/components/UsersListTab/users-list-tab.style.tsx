import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    flex: 1,
  },
  title: {
    ...typography.title2_24,
    marginBottom: 20,
    color: colors.grayscale[100],
  },
  usersContainer: {
    paddingBottom: 100,
  },
  user: {
    marginBottom: 24,
    marginRight: 0,
  },
  evenUserCard: {
    marginRight: 15,
  },
  emptyUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyUsersText: {
    ...typography.subhead3_regular,
    color: colors.grayscale[70],
    paddingTop: 22,
    maxWidth: 250,
    textAlign: 'center',
  },
});
export default styles;
