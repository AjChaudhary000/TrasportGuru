import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {StyleProp, ViewStyle} from 'react-native';
import React from 'react';

export interface IRoute {
  key?: string;
  routeName?: string;
}

export interface IRenderIcon {
  ({
    route,
    focused,
    horizontal,
    tintColor,
  }: {
    route?: IRoute;
    focused?: boolean;
    horizontal?: boolean;
    tintColor?: string;
  }): React.ReactElement;
}

export type Props = {
  route?: IRoute;
  horizontal?: boolean;
  activeOpacity?: number;
  inactiveOpacity?: number;
  activeTintColor?: string;
  inactiveTintColor?: string;
  renderIcon?: IRenderIcon;
  style?: StyleProp<ViewStyle>;
  navigation?: NavigationScreenProp<NavigationState>;
};
