import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    borderRadius: 20,
    backgroundColor: colors.grayscale[10],
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.grayscale[20],
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  statusIcon: {
    position: 'absolute',
    bottom: 0,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: colors.white,
    borderWidth: 1,
    backgroundColor: colors.secondary.normal,
  },
  questionText: {
    color: colors.white,
    ...typography.footnote3_10SemiBold,
  },
  title: {
    ...typography.body2_medium,
    marginBottom: 4,
  },
  text: {
    ...typography.subhead3_regular,
    color: colors.grayscale[60],
  },
  lastTimeText: {
    ...typography.footnote2_12Regular,
    color: colors.grayscale[70],
  },
});

export default styles;
