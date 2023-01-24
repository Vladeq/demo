import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  modalText: {
    marginBottom: 12,
    textAlign: 'center',
    color: colors.grayscale[100],
    ...typography.body2_medium,
  },
  modalButton: {
    marginVertical: 12,
  },
});

export default styles;
