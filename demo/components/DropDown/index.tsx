import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ModalDropdown from '../../component/ModalDropdown';
import Text from '../Text';
import {sizeFont, sizeWidth} from '../../util/Size';
import {APP_COLOR} from '../../../res/style/AppStyle';

import styles from './styles';
import {IProps} from './Dropdown_Types';

interface IRowData {
  name: string;
}

export default class DropDown extends Component<IProps> {
  private drop_down: React.RefObject<ModalDropdown> | null = React.createRef();

  render() {
    const {data, defaultValue, style, styleDropDown, onSelect, styleText} =
      this.props;
    const count = data.length;
    const DROPDOWN = StyleSheet.flatten([styles.dropdown, {}]);

    const drop_down =
      data.length <= 5
        ? [styles.dropdown_select, {height: sizeWidth(9) * count}]
        : styles.dropdown_select_Height;
    return (
      <ModalDropdown
        ref={drop_down => {
          this.drop_down = drop_down as React.RefObject<ModalDropdown> | null;
        }}
        style={[styles.dropdown, DROPDOWN, style]}
        textStyle={[styles.text, styleText]}
        dropdownStyle={[drop_down, styleDropDown]}
        options={data || []}
        key={defaultValue}
        defaultValue={defaultValue}
        renderButtonText={(rowData: IRowData | string) =>
          this._dropdown_renderButtonText(rowData)
        }
        renderRow={this._dropdown_renderRow}
        onSelect={onSelect}
      />
    );
  }

  _dropdown_renderButtonText = (rowData: IRowData | string) => {
    const name =
      (rowData && typeof rowData !== 'string' && rowData.name) || rowData;
    return <Text style={{fontSize: sizeFont(3.73)}}>{name}</Text>;
  };

  _dropdown_renderRow = (rowData: IRowData) => {
    const {defaultValue} = this.props;
    const color = rowData.name === defaultValue ? APP_COLOR : '#000';
    return (
      <TouchableHighlight underlayColor="cornflowerblue">
        <View
          style={[
            {
              justifyContent: 'center',
              paddingVertical: sizeWidth(1),
              height: sizeWidth(9),
            },
          ]}>
          <Text style={[styles.text, {color, paddingVertical: sizeWidth(1)}]}>
            {rowData.name || rowData}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };
}
