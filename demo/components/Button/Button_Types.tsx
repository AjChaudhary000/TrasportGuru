import {StyleProp, TextStyle, ViewStyle} from 'react-native';

interface IOnPress {
  (): void;
}

interface IConfig {
  color?: string;
  size?: number;
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
}

export interface IProps extends IConfig {
  configLeft: IConfig;
  configRight: IConfig;
  textStyle?: StyleProp<TextStyle>;
  onPress?: IOnPress;
  disabled?: boolean;
  text?: string;
  iconRight?: string;
  iconLeft?: string;
}
