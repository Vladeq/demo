import { StyleSheet } from 'react-native';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 16,
  },
  rightBlock: {
    flexDirection: 'row',
    paddingRight: 4,
  },
  headerIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superLikeIcon: {
    marginLeft: 16,
    backgroundColor: colors.secondary.normal,
  },
  headerText: {
    color: colors.grayscale[100],
    ...typography.subhead2_medium,
  },
  infinitySymbol: {
    fontWeight: '500',
    fontSize: 18,
  },
});

export default styles;
