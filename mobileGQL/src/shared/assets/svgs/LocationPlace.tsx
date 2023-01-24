import * as React from 'react';
import Svg, { Defs, Ellipse, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

const SvgLocationPlace = (props: SvgProps) => (
  <Svg width={80} height={84} fill="none" viewBox="0 0 80 84" {...props}>
    <Ellipse cx={40} cy={62} rx={40} ry={22} fill="#F6F6F8" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.334 27.514c0-12.266 10.25-22.18 22.649-22.18 12.434 0 22.684 9.914 22.684 22.18 0 6.181-2.248 11.92-5.948 16.784a58.837 58.837 0 0 1-14.776 13.709c-1.296.848-2.466.912-3.888 0a57.707 57.707 0 0 1-14.773-13.71c-3.703-4.863-5.948-10.602-5.948-16.783Zm15.184.69c0 4.11 3.353 7.342 7.465 7.342 4.114 0 7.5-3.232 7.5-7.341 0-4.077-3.386-7.467-7.5-7.467-4.112 0-7.465 3.39-7.465 7.467Z"
      fill="url(#locationPlace_svg__a)"
    />
    <Defs>
      <LinearGradient
        id="locationPlace_svg__a"
        x1={17.334}
        y1={32}
        x2={62.667}
        y2={32}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#B24592" />
        <Stop offset={1} stopColor="#F15F79" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgLocationPlace;
