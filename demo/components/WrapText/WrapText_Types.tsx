import {StyleProp, TextStyle, ViewStyle} from 'react-native';

type ellipsize = 'head' | 'middle' | 'tail' | 'clip';

export interface IProps {
  style?: StyleProp<TextStyle>;
  wrapStyle?: StyleProp<ViewStyle>;
  numberOfLines?: number;
  ellipsizeMode?: ellipsize;
}
