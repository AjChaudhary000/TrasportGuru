import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  style?: StyleProp<ViewStyle>;
  text?: string;
  onPress?: () => void;
}
