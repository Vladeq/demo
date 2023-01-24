import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgFacebookIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M19.5 2h-15C3.12 2 2 3.12 2 4.5v15C2 20.878 3.12 22 4.5 22h15c1.378 0 2.5-1.122 2.5-2.5v-15C22 3.12 20.878 2 19.5 2Z"
      fill="#3B5999"
    />
    <Path
      d="M15.75 12V9.5c0-.69.56-.625 1.25-.625h1.25V5.75h-2.5A3.75 3.75 0 0 0 12 9.5V12H9.5v3.125H12V22h3.75v-6.875h1.875L18.875 12H15.75Z"
      fill="#fff"
    />
  </Svg>
);

export default SvgFacebookIcon;
