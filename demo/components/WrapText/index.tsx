import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {IProps} from './WrapText_Types';
import styles from './styles';

export default class WrapText extends Component<IProps> {
  render() {
    const {children, style, wrapStyle, numberOfLines, ellipsizeMode} =
      this.props;

    return (
      <View style={[{flexDirection: 'row'}, wrapStyle]}>
        <Text
          numberOfLines={numberOfLines}
          ellipsizeMode={ellipsizeMode}
          style={[styles.Text, style]}>
          {children}
        </Text>
      </View>
    );
  }
}
