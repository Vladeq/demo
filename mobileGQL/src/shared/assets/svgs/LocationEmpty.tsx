import * as React from 'react';
import Svg, { Ellipse, Path, SvgProps } from 'react-native-svg';

const SvgLocationEmpty = (props: SvgProps) => (
  <Svg width={80} height={84} fill="none" viewBox="0 0 80 84" {...props}>
    <Ellipse cx={40} cy={62} rx={40} ry={22} fill="#F6F6F8" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.333 27.514c0-12.266 10.25-22.18 22.65-22.18 12.433 0 22.683 9.914 22.683 22.18 0 6.181-2.248 11.92-5.948 16.784a58.84 58.84 0 0 1-14.776 13.709c-1.296.847-2.465.911-3.888 0a57.709 57.709 0 0 1-14.773-13.71c-3.703-4.863-5.948-10.602-5.948-16.783Zm15.185.69c0 4.11 3.353 7.342 7.464 7.342 4.114 0 7.5-3.232 7.5-7.341 0-4.078-3.386-7.467-7.5-7.467-4.111 0-7.464 3.39-7.464 7.467Z"
      fill="#D8D6DD"
    />
  </Svg>
);

export default SvgLocationEmpty;
