import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  ReturnKeyTypeOptions,
  TextInput,
  TextInputSubmitEditingEventData,
} from 'react-native';
import React from 'react';

export interface IProps {
  icon: ImageSourcePropType;
  textRef: React.RefObject<TextInput> | null;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
  keyboardType: KeyboardTypeOptions;
  returnKeyType: ReturnKeyTypeOptions;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => void;
}

export interface IState {
  underlineColor: string;
}
