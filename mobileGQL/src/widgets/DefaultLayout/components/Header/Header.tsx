import { useNavigation } from '@react-navigation/native';
import React, { FC, ReactNode } from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { ArrowIcon } from 'shared/assets/svgs';
import { AppButton } from 'shared/ui';

import styles from './Header.styles';

interface HeaderProps extends ViewProps {
  title?: string;
  customLeft?: ReactNode;
  customRight?: ReactNode;
  customTitle?: ReactNode;
  defaultBack?: boolean;
  onBackButtonPress?: () => void;
  onRightButtonPress?: () => void;
}

const Header: FC<HeaderProps> = ({
  title,
  customLeft,
  customRight,
  customTitle,
  defaultBack,
  onBackButtonPress,
  onRightButtonPress,
  ...props
}) => {
  const { goBack } = useNavigation();

  return (
    <View {...props} style={[styles.root, props.style]}>
      {defaultBack ? (
        <AppButton.SquareButton
          style={styles.leftButton}
          Icon={ArrowIcon}
          onPress={onBackButtonPress || goBack}
        />
      ) : customLeft ? (
        <TouchableOpacity style={styles.leftButton}>{customLeft}</TouchableOpacity>
      ) : null}
      {customTitle ? customTitle : title && <Text style={styles.title}>{title || ''}</Text>}

      <TouchableOpacity style={styles.rightButton} onPress={onRightButtonPress}>
        {customRight ? customRight : null}
      </TouchableOpacity>
    </View>
  );
};

export default Header;
