import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const deviceScreenHeight = Dimensions.get('screen').height;
const deviceScreenWidth = Dimensions.get('screen').width;

const screenHeight = width < height ? height : width;
const screenWidth = width < height ? width : height;

const deviceHeight = deviceScreenWidth < deviceScreenHeight ? deviceScreenHeight : deviceScreenWidth;

const deviceWidth = deviceScreenWidth < deviceScreenHeight ? deviceScreenWidth : deviceScreenHeight;

const ratioDeviceHeightToScreenHeight = deviceHeight / screenHeight;

export default {
  screen: {
    height: screenHeight,
    width: screenWidth,
  },
  device: {
    height: deviceHeight,
    width: deviceWidth,
  },
  ratioDeviceHeightToScreenHeight,
};
