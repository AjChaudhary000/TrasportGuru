import {
  ImageResizeMode,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  ResizeMode,
  ImageStyle as FastImageStyle,
} from 'react-native-fast-image';

export interface IProps {
  style: StyleProp<FastImageStyle> | StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode | ResizeMode;
  placeholder: ImageSourcePropType;
  uri: string;
  priority: string;
  onLoadEnd: () => void;
}
