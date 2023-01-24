import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgDeleteIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#200E32" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20.287 5.243c.39 0 .713.323.713.734v.38a.73.73 0 0 1-.713.734H3.714A.73.73 0 0 1 3 6.357v-.38c0-.411.324-.734.714-.734H6.63c.592 0 1.107-.421 1.24-1.015l.153-.682C8.261 2.617 9.041 2 9.935 2h4.13c.884 0 1.674.617 1.902 1.497l.163.73a1.28 1.28 0 0 0 1.241 1.016h2.916Zm-1.481 13.891c.304-2.837.837-9.577.837-9.645a.746.746 0 0 0-.18-.558.726.726 0 0 0-.524-.234H5.07c-.2 0-.391.087-.524.234a.79.79 0 0 0-.19.558l.053.647c.142 1.763.537 6.674.793 8.998.18 1.712 1.304 2.788 2.931 2.827 1.256.029 2.55.039 3.872.039 1.246 0 2.51-.01 3.805-.039 1.684-.029 2.806-1.086 2.997-2.827Z"
    />
  </Svg>
);

export default SvgDeleteIcon;
