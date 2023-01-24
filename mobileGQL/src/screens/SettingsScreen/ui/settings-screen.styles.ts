import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  firstMenuItem: {
    marginTop: 16,
  },
  divider: {
    height: 12,
    width: sizes.screen.width,
    marginLeft: -16,
    marginTop: 12,
    marginBottom: 14,
    backgroundColor: colors.grayscale[20],
  },
  deleteButton: {
    marginTop: 'auto',
  },
  deleteButtonText: {
    color: colors.additional.error,
    ...typography.subhead2_medium,
  },
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
