import { Platform } from 'react-native';

//@ts-ignore
const redHatDisplayBold = Platform.select({
  ios: () => {
    return { fontFamily: 'RedHatDisplay-Bold', fontWeight: '700' };
  },
  android: () => {
    return { fontFamily: 'RedHatDisplay-Bold' };
  },
})();
//@ts-ignore
const redHatTextBold = Platform.select({
  ios: () => {
    return { fontFamily: 'RedHatText-Bold', fontWeight: '700' };
  },
  android: () => {
    return { fontFamily: 'RedHatText-Bold' };
  },
})();
//@ts-ignore
const redHatTextSemiBold = Platform.select({
  ios: () => {
    return { fontFamily: 'RedHatText-SemiBold', fontWeight: '600' };
  },
  android: () => {
    return { fontFamily: 'RedHatText-SemiBold' };
  },
})();
//@ts-ignore
const redHatTextMedium = Platform.select({
  ios: () => {
    return { fontFamily: 'RedHatText-Medium', fontWeight: '500' };
  },
  android: () => {
    return { fontFamily: 'RedHatText-Medium' };
  },
})();
//@ts-ignore
const redHatTextRegular = Platform.select({
  ios: () => {
    return { fontFamily: 'RedHatText-Regular', fontWeight: '400' };
  },
  android: () => {
    return { fontFamily: 'RedHatText-Regular' };
  },
})();

export default { redHatDisplayBold, redHatTextBold, redHatTextSemiBold, redHatTextMedium, redHatTextRegular };
