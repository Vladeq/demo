import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  root: {
    paddingHorizontal: 16,
  },
  cancelButton: {
    marginTop: 8,
    paddingVertical: 18,
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: colors.grayscale[0],
  },
  cancelText: {
    color: colors.primary.systemBlue,
    ...typography.system_title3_20Bold,
  },
});

export default styles;
