import { NavigationContainerRef } from '@react-navigation/native';
import { NavigatorParams as ParamList } from 'processes/navigation/main-stack/MainStackNavigator';
import React from 'react';
import AppRoutes from 'shared/routes';

const NavigationService = {
  navigationRef: React.createRef<NavigationContainerRef<ParamList>>(),

  navigate<RouteName extends keyof ParamList>(
    ...args: undefined extends ParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: ParamList[RouteName]]
      : [screen: RouteName, params: ParamList[RouteName]]
  ) {
    this.navigationRef.current?.navigate(...args);
  },
  reset(routes: { name: AppRoutes }[], index = 0) {
    this.navigationRef.current?.reset({ index, routes });
  },
};

export default NavigationService;
