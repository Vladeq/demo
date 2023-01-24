import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgHomeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#1D1A29" viewBox="0 0 24 24" {...props}>
    <Path d="M9.635 20.773v-3.057c0-.78.637-1.414 1.423-1.414h2.875c.377 0 .74.15 1.006.414.267.265.417.625.417 1v3.057c-.002.325.126.637.356.867.23.23.544.36.87.36h1.962a3.46 3.46 0 0 0 2.443-1A3.41 3.41 0 0 0 22 18.579V9.867c0-.735-.328-1.431-.895-1.902l-6.671-5.29a3.097 3.097 0 0 0-3.949.072L3.967 7.965A2.474 2.474 0 0 0 3 9.867v8.702C3 20.464 4.547 22 6.456 22h1.916c.68 0 1.231-.544 1.236-1.218l.027-.009Z" />
  </Svg>
);

export default SvgHomeIcon;
