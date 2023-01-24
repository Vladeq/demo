import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const SvgNotificationIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="#200E32" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.207 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 0 1-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 0 1-2.9-1.413A3.616 3.616 0 0 1 4 13.956c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C8.361 2.942 10.419 2 12.456 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426ZM9.574 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 0 1-1.713.731 3.795 3.795 0 0 1-1.008 0 3.618 3.618 0 0 1-1.714-.732c-.39-.269-.67-.694-.695-1.173Z"
    />
  </Svg>
);

export default SvgNotificationIcon;
