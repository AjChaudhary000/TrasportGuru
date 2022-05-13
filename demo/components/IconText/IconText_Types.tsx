import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

export interface IProps {
  styleIcon?: StyleProp<ImageStyle>;
  style?: StyleProp<ViewStyle>;
  icon?: ImageSourcePropType;
  text?: string;
  disabled?: boolean;
  onPress?: () => void;
  styleText?: StyleProp<TextStyle>;
}
