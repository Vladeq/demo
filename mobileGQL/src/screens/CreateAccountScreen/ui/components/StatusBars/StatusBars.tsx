import React, { FC, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from 'shared/styles';

import { TOTAL_STEPS } from '../../../config';
import styles from './statusBars.styles';

const GRADIENT_START = { x: 0.0, y: 0.0 };
const GRADIENT_END = { x: 1.0, y: 0.0 };
const GRADIENT_COLORS = [colors.primary.gradient1, colors.primary.gradient2];

type StatusBarsProps = {
  activeSlide: number;
};

const StatusBars: FC<StatusBarsProps> = ({ activeSlide }) => {
  const firstStyle = useMemo(() => StyleSheet.create({ first: { marginLeft: 0 } }), []);

  return (
    <View style={styles.root}>
      {Array(TOTAL_STEPS + 1)
        .fill(1)
        .map((_, i) =>
          activeSlide >= i ? (
            <LinearGradient
              key={i}
              start={GRADIENT_START}
              end={GRADIENT_END}
              colors={GRADIENT_COLORS}
              style={[styles.bar, i === 0 && firstStyle.first]}
            />
          ) : (
            <View key={i} style={styles.bar} />
          ),
        )}
    </View>
  );
};

export default StatusBars;
