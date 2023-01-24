import React, { FC } from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'shared/styles';

import { TOTAL_STEPS } from '../../../config';
import styles from './dots.style';

const GRADIENT_START = { x: 0.0, y: 0.0 };
const GRADIENT_END = { x: 1.0, y: 1.0 };
const GRADIENT_COLORS = [colors.primary.gradient1, colors.primary.gradient2];

type DotsProps = {
  activeSlide: number;
};

const Dots: FC<DotsProps> = ({ activeSlide }) => {
  return (
    <View style={styles.root}>
      {Array(TOTAL_STEPS + 1)
        .fill(1)
        .map((_, i) =>
          activeSlide === i ? (
            <LinearGradient
              key={i}
              start={GRADIENT_START}
              end={GRADIENT_END}
              colors={GRADIENT_COLORS}
              style={styles.dotActive}
            />
          ) : (
            <View key={i} style={styles.dot} />
          ),
        )}
    </View>
  );
};

export default Dots;
