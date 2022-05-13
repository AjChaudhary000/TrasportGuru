import React, {Component} from 'react';
import {View, Image} from 'react-native';

import styles from './styles';
import {IProps} from './BottomTabItem_Types';

export default class BottomTabItem extends Component<IProps> {
  render() {
    const {icon, active} = this.props;
    let style = !active ? styles.Icon : styles.IconActive;

    return (
      <View>
        <Image resizeMode={'contain'} style={style} source={icon} />
      </View>
    );
  }
}
