import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  text: {
    color: colors.grayscale[100],
    ...typography.body3_regular,
  },
});

export default styles;
