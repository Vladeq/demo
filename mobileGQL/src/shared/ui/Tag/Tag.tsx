import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import AppText from '../AppText';
import TextGradient from '../TextGradient';
import styles from './tag.style';

type TagProps = TouchableOpacityProps & {
  text: string;
  isActive?: boolean;
};

/**
 * @ui tags has 3 variant
 * @isActive === true - active
 * @isActive === false - inactive
 * @isActive === undefined - default
 */
const Tag: FC<TagProps> = ({ text, isActive, ...props }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      {...props}
      style={[
        styles.root,
        isActive === true && styles.activeRoot,
        isActive === false && styles.inactiveRoot,
        props.style,
      ]}>
      {isActive ? (
        <TextGradient style={styles.text}>{text}</TextGradient>
      ) : (
        <AppText style={styles.text}>{text}</AppText>
      )}
    </TouchableOpacity>
  );
};

export default Tag;
