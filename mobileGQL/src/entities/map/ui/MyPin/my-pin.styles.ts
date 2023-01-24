import { StyleSheet } from 'react-native';
import { colors } from 'shared/styles';

import { DIAMETER } from './config';

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  pulse: {
    position: 'absolute',
    flex: 1,
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    backgroundColor: colors.effects.mapPulse,
  },
  innerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.effects.mapPulse,
    opacity: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderPulse: {
    flex: 1,
    width: DIAMETER,
    height: DIAMETER,
    borderRadius: DIAMETER / 2,
    borderWidth: 1,
    borderColor: colors.effects.mapPulse,
    backgroundColor: colors.alpha.primary10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
