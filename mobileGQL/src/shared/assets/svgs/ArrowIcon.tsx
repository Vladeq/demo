import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgArrowIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 20 20" stroke="#4C4955" {...props}>
    <Path d="M12.5 16.25 6.25 10l6.25-6.25" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default SvgArrowIcon;
