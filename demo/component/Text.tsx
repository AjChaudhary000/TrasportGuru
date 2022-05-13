import React, {PureComponent} from 'react';
import {StyleSheet, Text} from 'react-native';
import {sizeFont} from '../util/Size';
import {COLOR_APP_WHITE} from '../../res/style/AppStyle';
import {Fonts} from '../../res/themes';
import {IProps} from '../components/Text/Text_Types';

const EMPTY = '';

export default class AppText extends PureComponent<IProps> {
  render() {
    const {style, onPress, numberOfLines} = this.props;
    const children =
      this.props.children !== null && this.props.children !== undefined
        ? this.props.children
        : EMPTY;
    return (
      <Text
        {...this.props}
        numberOfLines={numberOfLines || 1}
        allowFontScaling={false}
        ellipsizeMode="tail"
        onPress={onPress}
        style={[styles.Text, style]}>
        {children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  Text: {
    fontSize: sizeFont(3.7),
    fontFamily: Fonts.type.OpenSansDisplayRegular,
    color: COLOR_APP_WHITE,
    backgroundColor: 'transparent',
  },
});
