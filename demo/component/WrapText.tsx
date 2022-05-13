import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {APP_TEXT_COLOR} from '../../res/style/AppStyle';
import {sizeFont, sizeWidth} from '../util/Size';
import {IProps} from '../components/WrapText/WrapText_Types';

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

const styles = StyleSheet.create({
  Text: {
    flexWrap: 'wrap',
    fontSize: sizeFont(3.7),
    color: APP_TEXT_COLOR,
    lineHeight: sizeWidth(5.6),
  },
});
