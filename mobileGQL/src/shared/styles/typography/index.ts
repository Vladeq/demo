import fonts from './fonts';

const typography = {
  title1_28: {
    fontSize: 28,
    lineHeight: 40,
    ...fonts.redHatDisplayBold,
  },
  title2_24: {
    fontSize: 24,
    lineHeight: 36,
    ...fonts.redHatDisplayBold,
  },
  title3_20: {
    fontSize: 20,
    lineHeight: 28,
    ...fonts.redHatDisplayBold,
  },
  title4_24: {
    fontSize: 20,
    lineHeight: 32,
    ...fonts.redHatDisplayBold,
  },
  system_title3_20Bold: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '600' as const,
  },
  system_title3_20Regular: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '400' as const,
  },
  headline1_18: {
    fontSize: 18,
    lineHeight: 26,
    ...fonts.redHatDisplayBold,
  },
  body1_bold: {
    fontSize: 16,
    lineHeight: 24,
    ...fonts.redHatTextBold,
  },
  body2_medium: {
    fontSize: 16,
    lineHeight: 24,
    ...fonts.redHatTextMedium,
  },
  body3_regular: {
    fontSize: 16,
    lineHeight: 24,
    ...fonts.redHatTextRegular,
  },
  subhead1_bold: {
    fontSize: 14,
    lineHeight: 20,
    ...fonts.redHatTextBold,
  },
  subhead2_medium: {
    fontSize: 14,
    lineHeight: 20,
    ...fonts.redHatTextMedium,
  },
  subhead3_regular: {
    fontSize: 14,
    lineHeight: 20,
    ...fonts.redHatTextRegular,
  },
  footnote1_12Medium: {
    fontSize: 12,
    lineHeight: 18,
    ...fonts.redHatTextMedium,
  },
  footnote2_12Regular: {
    fontSize: 12,
    lineHeight: 18,
    ...fonts.redHatTextRegular,
  },
  footnote3_10SemiBold: {
    fontSize: 10,
    lineHeight: 16,
    ...fonts.redHatTextSemiBold,
  },
  footnote4_10Regular: {
    fontSize: 10,
    lineHeight: 16,
    ...fonts.redHatTextRegular,
  },
};

export default typography;
