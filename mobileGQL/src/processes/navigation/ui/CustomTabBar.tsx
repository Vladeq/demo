import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_BAR_HEIGHT } from 'shared/constants';
import { colors } from 'shared/styles';
import { AppText } from 'shared/ui';

import styles from './custom-tab-bar.styles';

const CustomTabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom, height: TAB_BAR_HEIGHT + insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? (options.tabBarLabel as string)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            //@ts-ignore
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const Icon =
          options.tabBarIcon &&
          options.tabBarIcon({
            focused: isFocused,
            color: isFocused ? colors.secondary.normal : colors.grayscale[40],
            size: 24,
          });
        const Badge = options.tabBarBadge;

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View style={styles.button}>
              <View style={styles.iconWrapper}>
                {Icon}
                {!!Badge && <View style={styles.badgeWrapper} />}
              </View>
              <AppText style={isFocused ? styles.labelActive : styles.label}>{label}</AppText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
