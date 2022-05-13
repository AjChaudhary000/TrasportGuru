import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';

export interface IProps {
  style?: StyleProp<ImageStyle>;
  styleButton?: StyleProp<ViewStyle>;
  source?: ImageSourcePropType;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
  resizeMode?: ImageResizeMode;
  inheritParentStyle?: boolean;
  activeOpacity?: number;
  borderRadius?: number;
}
