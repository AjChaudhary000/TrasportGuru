import {Animated} from 'react-native';

export interface IProps {
  value: boolean;
  padding: number | boolean;
  switchWidth: number;
  buttonWidth: number;
  animationTime: number;
  onChangeValue: () => void;
  activeText: string;
  inactiveText: string;
  fontSize: number;
  activeTextColor: string;
  inactiveTextColor: string;
  activeBackgroundColor: string;
  inactiveBackgroundColor: string;
  activeButtonBackgroundColor: string;
  inactiveButtonBackgroundColor: string;
  switchHeight: number;
  switchBorderRadius: number;
  switchBorderColor: string;
  switchBorderWidth: number;
  buttonHeight: number;
  buttonBorderRadius: number;
  buttonBorderColor: string;
  buttonBorderWidth: number;
  shadowColor: string;
  shadowOffset?: {width: number; height: number};
  shadowRadius: number;
  shadowOpacity: number;
}

export interface IState {
  transformValue: Animated.Value;
  backgroundColor: Animated.Value;
  buttonBackgroundColor: Animated.Value;
}
