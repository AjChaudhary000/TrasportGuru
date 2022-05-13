import {GestureResponderEvent, StyleProp, TextStyle} from 'react-native';

export interface IProps {
  style?: StyleProp<TextStyle>;
  onPress?: (event: GestureResponderEvent) => void;
  numberOfLines?: number;
}
