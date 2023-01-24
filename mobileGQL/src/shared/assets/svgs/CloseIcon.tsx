import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgCloseIcon = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" stroke="#fff" {...props}>
    <Path d="M7 17 17 7M17 17 7 7" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default SvgCloseIcon;
