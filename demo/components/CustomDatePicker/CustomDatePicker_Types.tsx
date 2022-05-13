import React from 'react';
import {
  Animated,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native';

interface ICustomStyle {
  dateInput?: StyleProp<ViewStyle>;
  disabled?: StyleProp<ViewStyle>;
  dateTouchBody?: StyleProp<ViewStyle>;
  placeholderText?: StyleProp<TextStyle>;
  dateText?: StyleProp<TextStyle>;
  dateIcon?: StyleProp<ImageStyle>;
}

interface IDataChange {
  (arg?: string | null): void;
}
export interface IProps {
  date: Date | string;
  height: number;
  duration: number;
  onPressMask: () => void;
  onCloseModal: () => void;
  mode?: 'clock' | 'spinner' | 'default' | 'time';
  format: string;
  onDateChange: IDataChange;
  showIcon: boolean;
  iconSource: ImageSourcePropType;
  iconComponent: React.ReactNode;
  customStyles: ICustomStyle;
  minDate: Date | string;
  maxDate: Date | string;
  placeholder: string;
  allowFontScaling: boolean;
  androidMode?: 'clock' | 'spinner' | 'default';
  is24Hour: boolean;
  disabled: boolean;
  TouchableComponent: typeof TouchableHighlight;
  testID?: string;
  style: StyleProp<ViewStyle>;
}

export interface IFormats {
  [Key: string]: string;
}

export interface IState {
  date: Date | string;
  modalVisible: boolean;
  animatedHeight: Animated.Value;
  allowPointerEvents: boolean;
}
