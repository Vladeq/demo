import React, { FC } from 'react';
import { colors } from 'shared/styles';
import ToggleSwitch, { ToggleSwitchProps } from 'toggle-switch-react-native';

import styles from './AppSwitch.styles';

const AppSwitch: FC<ToggleSwitchProps> = (props) => {
  return (
    <ToggleSwitch
      {...props}
      animationSpeed={200}
      trackOffStyle={styles.track}
      trackOnStyle={styles.track}
      thumbOnStyle={styles.activeThumb}
      thumbOffStyle={styles.thumb}
      onColor={colors.secondary.normal}
      offColor={colors.grayscale[30]}
    />
  );
};

export default AppSwitch;
