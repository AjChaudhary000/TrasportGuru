import React, {PureComponent} from 'react';
import {Text} from 'react-native';

import styles from './styles';
import {IProps} from './Text_Types';

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
