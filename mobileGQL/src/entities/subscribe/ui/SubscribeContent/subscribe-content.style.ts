import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const style = StyleSheet.create({
  root: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grayscale[0],
    paddingHorizontal: 16,
    paddingVertical: sizes.screen.height > 580 ? 32 : 16,
    height: sizes.screen.height > 580 ? 571 : 491,
    borderRadius: 16,
  },
  title: {
    color: colors.grayscale[100],
    ...typography.title3_20,
  },
  plansRow: {
    flexDirection: 'row',
  },
  freePlan: {
    flex: 1,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grayscale[20],
  },
  premiumPlan: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.grayscale[10],
    borderWidth: 1,
    borderColor: colors.grayscale[10],
  },
  planTitle: {
    color: colors.grayscale[100],
    ...typography.body2_medium,
  },
  planPremiumTitle: {
    color: colors.grayscale[100],
    ...typography.body1_bold,
  },
  planTextWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  planText: {
    marginTop: 24,
    color: colors.grayscale[70],
    textAlign: 'center',
    ...typography.subhead3_regular,
  },
  cost: {
    color: colors.grayscale[100],
    ...typography.title1_28,
  },
  period: {
    ...typography.headline1_18,
    lineHeight: 40,
  },
  continueButton: {
    marginBottom: 8,
  },
  footerText: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.grayscale[60],
    ...typography.footnote4_10Regular,
  },
  footerTextBold: {
    color: colors.grayscale[60],
    ...typography.footnote3_10SemiBold,
  },
});

export default style;
