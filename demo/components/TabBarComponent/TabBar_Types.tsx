import LoadingStore from '../../mobx/LoadingStore';
import UserStore from '../../mobx/UserStore';
import {
  GestureResponderEvent,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {NavigationScreenProp, NavigationState} from 'react-navigation';
import {IRenderIcon, IRoute} from '../CrossFadeIcon/CrossFadeIcon_Types';

export type TabBarOptions = {
  activeTintColor?: string;
  inactiveTintColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  allowFontScaling: boolean;
  showLabel: boolean;
  showIcon: boolean;
  labelStyle: StyleProp<TextStyle>;
  tabStyle: StyleProp<ViewStyle>;
  adaptive?: boolean;
  style: StyleProp<ViewStyle>;
};
type safeAreaInsetValue = 'always' | 'never';

interface IGetLabel {
  ({
    route,
    focused,
    tintColor,
  }: {
    route: IRoute;
    focused: boolean;
    tintColor: string;
  }): string;
}
export type Props = TabBarOptions & {
  navigation: NavigationScreenProp<NavigationState>;
  onTabPress: (arg0: {route: IRoute}) => void;
  getAccessibilityLabel: (props: {route: IRoute}) => string;
  getLabelText: ({route}: {route: IRoute}) => string | IGetLabel;
  getTestID: (props: {route: IRoute}) => string;
  renderIcon: IRenderIcon;
  dimensions: {width: number; height: number};
  isLandscape: boolean;
  safeAreaInset: {
    top: safeAreaInsetValue;
    right: safeAreaInsetValue;
    bottom: safeAreaInsetValue;
    left: safeAreaInsetValue;
  };
  loadingStore?: LoadingStore;
  userStore?: UserStore;
};

export interface IProps {
  onPress?: () => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  testID?: string;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  key?: string;
}
