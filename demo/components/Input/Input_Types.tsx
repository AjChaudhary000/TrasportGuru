import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  StyleProp,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
} from 'react-native';
import React from 'react';

export interface IProps {
  icon: ImageSourcePropType;
  style: StyleProp<TextStyle>;
  multiline: boolean;
  numberOfLines: number;
  textRef: React.RefObject<TextInput> | null;
  maxLength: number;
  editable: boolean;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  keyboardType?: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}
