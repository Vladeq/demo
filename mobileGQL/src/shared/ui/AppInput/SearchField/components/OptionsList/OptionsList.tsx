import React, { useCallback } from 'react';
import { FlatList, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { colors } from 'shared/styles';

import OptionItem from '../OptionItem';
import styles from './OptionsList.styles';

type OptionsListProps = {
  onPress: (text: string) => void;
  onClose: () => void;
  options: TestItemType[];
  isVisible: boolean;
  dropdownPosition: number | null;
};

type TestItemType = {
  id: number;
  text: string;
};

const onKeyExtractor = (item: TestItemType) => String(item.id);

const OptionsList = ({ options, onPress, isVisible, onClose, dropdownPosition }: OptionsListProps) => {
  const renderItem = useCallback(
    ({ item }: { item: TestItemType }) => {
      return <OptionItem key={item.id} onPress={() => onPress(item.text)} text={item.text} />;
    },
    [onPress],
  );

  return (
    <ReactNativeModal
      isVisible={isVisible}
      backdropOpacity={0}
      backdropTransitionOutTiming={0}
      useNativeDriver
      animationInTiming={1}
      animationOutTiming={1}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}>
      <View style={[styles.dropdownContainer, { top: dropdownPosition! }, colors.effects.shadow1]}>
        <FlatList data={options} keyExtractor={onKeyExtractor} renderItem={renderItem} />
      </View>
    </ReactNativeModal>
  );
};
export default OptionsList;
