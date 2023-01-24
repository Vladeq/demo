import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  skeletonTitle: {
    marginBottom: 28,
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  container: {
    alignItems: 'center',
  },
  skeletonImg: {
    marginBottom: 12,
    width: 343,
    height: 408,
    borderRadius: 16,
  },
  skeletonName: {
    width: 302,
    height: 28,
    borderRadius: 16,
    marginBottom: 40,
  },
  containerSmall: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
});

export default styles;
