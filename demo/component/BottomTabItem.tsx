import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {IProps} from '../components/BottomTabItem/BottomTabItem_Types';
import styles from '../components/BottomTabItem/styles';

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
