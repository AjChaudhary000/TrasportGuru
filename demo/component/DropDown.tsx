import React, {Component} from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ModalDropdown from './ModalDropdown';
import Text from './Text';
import {sizeFont, sizeWidth} from '../util/Size';
import {APP_COLOR} from '../../res/style/AppStyle';
import {IProps} from '../components/DropDown/Dropdown_Types';
import styles from '../components/DropDown/styles';

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
        ref={drop_down_ref => {
          this.drop_down =
            drop_down_ref as React.RefObject<ModalDropdown> | null;
        }}
        style={[styles.dropdown, DROPDOWN, style]}
        textStyle={[styles.text, styleText]}
        dropdownStyle={[drop_down, styleDropDown]}
        options={data || []}
        key={defaultValue}
        defaultValue={defaultValue}
        renderButtonText={(rowData: {name: string} | string) =>
          this._dropdown_renderButtonText(rowData) as
            | string
            | React.ReactElement
        }
        renderRow={this._dropdown_renderRow}
        onSelect={onSelect}
      />
    );
  }

  _dropdown_renderButtonText = (rowData: {name: string} | string) => {
    let name = rowData;
    if (typeof rowData !== 'string') {
      name = rowData?.name;
    }
    return <Text style={{fontSize: sizeFont(3.73)}}>{name}</Text>;
  };

  _dropdown_renderRow = (rowData: {name: string}) => {
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
