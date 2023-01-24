import * as React from 'react';
import Svg, { Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

const SvgLocationBig = (props: SvgProps) => (
  <Svg width={64} height={64} fill="none" viewBox="0 0 64 64" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.333 27.514c0-12.266 10.25-22.18 22.65-22.18 12.433 0 22.683 9.914 22.683 22.18 0 6.181-2.248 11.92-5.948 16.784a58.839 58.839 0 0 1-14.776 13.709c-1.296.848-2.465.912-3.888 0a57.707 57.707 0 0 1-14.773-13.71c-3.703-4.863-5.948-10.602-5.948-16.783Zm15.185.69c0 4.11 3.353 7.342 7.464 7.342 4.114 0 7.5-3.232 7.5-7.341 0-4.077-3.386-7.467-7.5-7.467-4.111 0-7.464 3.39-7.464 7.467Z"
      fill="url(#LocationBig_svg__a)"
    />
    <Defs>
      <LinearGradient
        id="LocationBig_svg__a"
        x1={9.333}
        y1={32}
        x2={54.666}
        y2={32}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#B24592" />
        <Stop offset={1} stopColor="#F15F79" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgLocationBig;
