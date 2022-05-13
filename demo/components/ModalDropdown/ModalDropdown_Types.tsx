import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import React from 'react';

interface IAdjustFrame {
  (style: StyleProp<ViewStyle>): StyleProp<ViewStyle>;
}

export interface IOnSelect {
  (arg1: {value: string | null; index: number}): void;
}

export interface IProps {
  disabled?: boolean;
  accessible?: boolean;
  options?: IOptions[];
  defaultValue?: string | null;
  defaultIndex?: number;
  textStyle?: StyleProp<TextStyle>;
  onDropdownWillShow?: () => boolean;
  onDropdownWillHide?: () => boolean;
  animated?: boolean;
  dropdownStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  adjustFrame?: IAdjustFrame;
  dropdownTextStyle?: StyleProp<TextStyle>;
  dropdownTextHighlightStyle?: StyleProp<TextStyle>;
  onSelect?: IOnSelect;
  renderButtonText?: (
    rowData: {name: string} | string,
  ) => string | React.ReactElement;
  renderRow?: (rowData: {name: string}) => string | React.ReactElement;
}

export interface IState {
  disabled?: boolean;
  accessible?: boolean;
  loading?: boolean;
  showDropdown: boolean;
  buttonText?: string | React.ReactElement | null;
  selectedIndex?: number;
}

export interface IOptions {
  key: string;
}
