import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgLocationIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#200E32" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 10.318C3.5 5.718 7.344 2 11.993 2c4.663 0 8.507 3.718 8.507 8.318 0 2.318-.843 4.47-2.23 6.294a22.063 22.063 0 0 1-5.541 5.14c-.486.318-.925.342-1.459 0a21.64 21.64 0 0 1-5.54-5.14c-1.388-1.824-2.23-3.976-2.23-6.294Zm5.694.259c0 1.54 1.258 2.753 2.8 2.753 1.542 0 2.812-1.212 2.812-2.753 0-1.53-1.27-2.8-2.813-2.8a2.814 2.814 0 0 0-2.799 2.8Z"
    />
  </Svg>
);

export default SvgLocationIcon;
