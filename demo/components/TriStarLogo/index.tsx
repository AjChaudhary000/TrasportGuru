import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {sizeWidth} from '../../util/Size';
import {IProps} from './TriStarLogo_Types';

export default class TriStarLogo extends React.PureComponent<IProps> {
  render() {
    const {style, styleButton, source, onPress, resizeMode} = this.props;

    return (
      <TouchableOpacity
        style={[styles.container, styleButton]}
        onPress={onPress}
        disabled={!onPress}>
        <Image
          source={source || require('../../../res/images/Center3Stars.png')}
          // backgroundColor={backgroundColor}
          resizeMode={resizeMode || 'contain'}
          style={[styles.icon, style]}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    height: sizeWidth(10),
    width: sizeWidth(30),
  },
});
