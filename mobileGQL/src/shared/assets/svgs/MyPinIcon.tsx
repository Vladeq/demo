import * as React from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, Stop, SvgProps } from 'react-native-svg';

const SvgMyPinIcon = (props: SvgProps) => (
  <Svg width={32} height={32} fill="none" {...props}>
    <Circle cx={16} cy={16} r={16} fill="url(#myPinIcon_svg__a)" />
    <Path
      d="m9.282 14.525 10.58-3.662a.999.999 0 0 1 1.276 1.274L17.475 22.72a.988.988 0 0 1-.944.675h-.018a.976.976 0 0 1-.938-.7L14.1 17.906l-4.787-1.481a.988.988 0 0 1-.706-.938.994.994 0 0 1 .675-.962Z"
      fill="#fff"
    />
    <Defs>
      <LinearGradient id="myPinIcon_svg__a" x1={0} y1={16} x2={32} y2={16} gradientUnits="userSpaceOnUse">
        <Stop stopColor="#B24592" />
        <Stop offset={1} stopColor="#F15F79" />
      </LinearGradient>
    </Defs>
  </Svg>
);

export default SvgMyPinIcon;
