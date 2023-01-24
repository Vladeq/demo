import { ParamListBase, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type ScreenBaseProps<PageName extends string, NavigatorParams extends ParamListBase> = {
  navigation: NativeStackNavigationProp<NavigatorParams, PageName>;
  route: RouteProp<NavigatorParams, PageName>;
};

export type ArrayElem<T> = T extends Array<infer Item> ? Item : T;

export type LocationUsersType = {
  id: string;
  lat: number;
  long: number;
};

export type UsersAsPinsType = {
  avatarImage: string | undefined;
  id: string;
  lat: number;
  long: number;
};
