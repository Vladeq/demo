import MaskedView from '@react-native-masked-view/masked-view';
import React, { FC } from 'react';
import { Text, TextProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'shared/styles';

import styles from './text-gradient.styles';

const START_GRADIENT = { x: 0, y: 0 };
const END_GRADIENT = { x: 1, y: 0 };
const COLORS_GRADIENT = [colors.primary.gradient1, colors.primary.gradient2];

const TextGradient: FC<TextProps> = (props) => {
  return (
    <MaskedView maskElement={<Text allowFontScaling={false} {...props} />}>
      <LinearGradient colors={COLORS_GRADIENT} start={START_GRADIENT} end={END_GRADIENT}>
        <Text allowFontScaling={false} {...props} style={[props.style, styles.opacity]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default TextGradient;
