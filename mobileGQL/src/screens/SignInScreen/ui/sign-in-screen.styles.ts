import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  layout: {
    backgroundColor: 'transparent',
  },
  head: {
    flex: 1,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  headText: {
    color: colors.grayscale[0],
    textAlign: 'center',
    ...typography.title1_28,
  },
  formWrapper: {
    marginBottom: 72,
  },
  buttonWrapper: {
    marginBottom: 12,
  },
  agreementsText: {
    marginTop: 4,
    marginBottom: 30,
    color: colors.grayscale[0],
    textAlign: 'center',
    ...typography.footnote2_12Regular,
  },
  agreementsLink: {
    ...typography.footnote1_12Medium,
  },
  disableScreenWrapper: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
  },
  uikit: { position: 'absolute' },
  matchscreen: { position: 'absolute', top: 45 },
});

export default styles;
