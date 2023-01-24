import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

const SvgSearchIcon = (props: SvgProps) => (
  <Svg width={20} height={20} stroke="#BFBDC6" viewBox="0 0 20 20" {...props}>
    <Circle cx={9.805} cy={9.806} r={7.49} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="m15.015 15.404 2.937 2.93" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default SvgSearchIcon;
