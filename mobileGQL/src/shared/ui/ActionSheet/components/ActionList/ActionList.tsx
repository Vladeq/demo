import React, { FC } from 'react';
import { View } from 'react-native';

import { ActionSheetItem } from '../../types';
import ActionItem from '../ActionItem';
import Separator from '../Separator';
import styles from './action-list.style';

type ActionListProps = {
  list: ActionSheetItem[];
  onItemPress: (index: number) => void;
};

const ActionList: FC<ActionListProps> = ({ list, onItemPress }) => {
  return (
    <View style={styles.root}>
      {list.map((item, index) => (
        <React.Fragment key={item.text}>
          <ActionItem onPress={() => onItemPress(index)} text={item.text} />
          {index < list.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default ActionList;
