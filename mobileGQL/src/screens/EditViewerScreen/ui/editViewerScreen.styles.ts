import { StyleSheet } from 'react-native';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { colors, typography } from 'shared/styles';

const styles = StyleSheet.create({
  root: {
    paddingBottom: TAB_BAR_HEIGHT + 22,
  },
  photo: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  error: {
    color: colors.additional.error,
    ...typography.footnote1_12Medium,
  },
  name: {
    flexGrow: 1,
    paddingTop: 12,
  },
  interest: {
    paddingTop: 32,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    marginHorizontal: 6,
    marginVertical: 5,
    borderColor: colors.primary.lighter,
    backgroundColor: colors.primary.lighter,
  },
  firstTag: {
    marginLeft: 0,
  },
});

export default styles;
