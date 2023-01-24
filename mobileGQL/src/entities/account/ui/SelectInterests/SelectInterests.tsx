import React, { Dispatch, FC, SetStateAction } from 'react';
import { View } from 'react-native';
import { useGetInterestsTags } from 'shared/qraphql/queries/__generated__/getInterestsTags.query';
import { Tag } from 'shared/ui';

import styles from './selectInterests.styles';

type SelectInterestsProps = {
  activeTags: string[];
  setActiveTags: Dispatch<SetStateAction<string[]>>;
};

const SelectInterests: FC<SelectInterestsProps> = ({ activeTags, setActiveTags }) => {
  const { data } = useGetInterestsTags();
  const TAGS = data?.getAllCustomerTags;
  return (
    <View style={styles.tags}>
      {TAGS?.map((tag) => {
        return (
          <Tag
            text={tag.title}
            key={tag.id}
            style={styles.tag}
            isActive={activeTags.includes(tag.id)}
            onPress={() => {
              if (activeTags.includes(tag.id)) {
                setActiveTags((prev) => prev.filter((item) => item !== tag.id));
              } else {
                if (activeTags.length < 5) {
                  setActiveTags((prev) => [...prev, tag.id]);
                }
              }
            }}
          />
        );
      })}
    </View>
  );
};

export default SelectInterests;
