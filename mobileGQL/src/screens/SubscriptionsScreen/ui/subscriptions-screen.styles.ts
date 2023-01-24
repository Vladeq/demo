import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  freeStatusText: {
    color: colors.grayscale[70],
    ...typography.body3_regular,
    marginTop: 24,
    marginBottom: 32,
    textAlign: 'center',
  },
  premiumStatusText: {
    ...typography.body2_medium,
    marginTop: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  priceBlock: {
    backgroundColor: colors.grayscale[20],
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 22,
    borderRadius: 16,
    marginBottom: 12,
  },
  price: {
    color: colors.grayscale[100],
    ...typography.title3_20,
  },
  grayText: {
    color: colors.grayscale[70],
    ...typography.body3_regular,
  },
  dateBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unsubscribeContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  unsubscribeButton: {
    borderColor: colors.grayscale[40],
    borderWidth: 1,
    marginBottom: 24,
  },
});

export default styles;
