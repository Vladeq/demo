import { StyleSheet } from 'react-native';
import { colors, sizes, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    width: sizes.device.width - 16 * 2,
    aspectRatio: 343 / 408,
    borderRadius: 24,
    marginTop: 28,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  nameText: {
    color: colors.grayscale[100],
    ...typography.title2_24,
    marginTop: 12,
  },
  premiumBlock: {
    marginTop: 24,
  },
  tags: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  tag: {
    marginHorizontal: 6,
    marginVertical: 5,
    borderColor: colors.primary.lighter,
    backgroundColor: colors.primary.lighter,
  },
  button: {
    marginTop: 26,
  },
  rightHeaderButton: {
    width: 40,
    height: 40,
  },
  modalTitle: {
    color: colors.grayscale[100],
    ...typography.body2_medium,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 24,
    marginBottom: 12,
  },
});

export default styles;
