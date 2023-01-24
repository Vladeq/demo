import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgUserIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#200E32" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.294 7.291A5.274 5.274 0 0 1 12 12.583a5.275 5.275 0 0 1-5.294-5.292A5.274 5.274 0 0 1 12 2a5.273 5.273 0 0 1 5.294 5.291ZM12 22c-4.338 0-8-.705-8-3.425 0-2.721 3.685-3.401 8-3.401 4.339 0 8 .705 8 3.425C20 21.32 16.315 22 12 22Z"
    />
  </Svg>
);

export default SvgUserIcon;
