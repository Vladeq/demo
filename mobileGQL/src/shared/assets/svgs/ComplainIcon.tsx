import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgComplainIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="#615F6B" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 12C2 6.48 6.48 2 12 2c5.53 0 10 4.48 10 10s-4.47 10-10 10C6.48 22 2 17.52 2 12Zm9.12-3.79c0-.48.4-.88.88-.88s.87.4.87.88v4.42a.87.87 0 0 1-.87.87.879.879 0 0 1-.88-.87V8.21Zm.89 8.47c-.49 0-.88-.4-.88-.88s.39-.87.87-.87c.49 0 .88.39.88.87s-.39.88-.87.88Z"
    />
  </Svg>
);

export default SvgComplainIcon;
