import {StyleProp, ViewStyle} from 'react-native';

export interface IProps {
  color?: string;
  icon?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
}
