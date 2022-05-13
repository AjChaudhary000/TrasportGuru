import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export interface IProps {
  styleButton?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  color?: string;
  style?: StyleProp<TextStyle> | StyleProp<ViewStyle>;
}
