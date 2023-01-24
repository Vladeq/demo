import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgCursorIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#000" viewBox="0 0 24 24" {...props}>
    <Path d="m3.422 8.287 15.872-5.493a1.5 1.5 0 0 1 1.912 1.912l-5.494 15.872a1.48 1.48 0 0 1-1.415 1.013h-.028a1.463 1.463 0 0 1-1.407-1.05l-2.212-7.182-7.181-2.222a1.48 1.48 0 0 1-1.06-1.406 1.49 1.49 0 0 1 1.013-1.444Z" />
  </Svg>
);

export default SvgCursorIcon;
