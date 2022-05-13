import {StyleProp, TextStyle, ViewStyle} from 'react-native';
import {IOnSelect, IOptions} from '../ModalDropdown/ModalDropdown_Types';

export interface IProps {
  data: IOptions[];
  defaultValue: string;
  style: StyleProp<ViewStyle>;
  styleDropDown: StyleProp<ViewStyle>;
  onSelect: IOnSelect;
  styleText: StyleProp<TextStyle>;
}
