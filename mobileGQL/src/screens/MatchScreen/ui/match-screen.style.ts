import { StyleSheet } from 'react-native';
import { typography } from 'shared/styles';
import colors from 'shared/styles/themes/light';

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  layoutContainer: {
    backgroundColor: 'transparent',
  },
  close: {
    width: 24,
    height: 24,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  infoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 200,
    height: 240,
    backgroundColor: colors.white,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 24,
    marginBottom: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    ...typography.title1_28,
    marginBottom: 16,
    color: colors.white,
  },
  description: {
    ...typography.subhead3_regular,
    color: colors.white,
    textAlign: 'center',
  },
  boldText: {
    ...typography.subhead2_medium,
    color: colors.white,
    textAlign: 'center',
  },
});
export default styles;
