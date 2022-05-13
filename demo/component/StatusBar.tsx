import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {STATUS_BAR_COLOR} from '../../res/style/AppStyle';
import {STATUS_BAR_HEIGHT} from '../../Constant';

export default class StatusBar extends Component {
  render() {
    return <View style={styles.statusBar} />;
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: STATUS_BAR_COLOR,
  },
});
